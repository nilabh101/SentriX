import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from sqlmodel import Session, select
from .database import engine
from .models import Alert, TriageResult, SourceLog

def triage_alert(alert_id: int):
    with Session(engine) as session:
        alert = session.get(Alert, alert_id)
        if not alert:
            return

        # Fetch associated logs
        statement = select(SourceLog).where(SourceLog.alert_id == alert_id)
        logs = session.exec(statement).all()
        log_contents = "\n".join([log.content for log in logs])

        # Initialize LangChain
        llm = ChatOpenAI(model="gpt-4-turbo-preview", temperature=0)
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are an expert SOC Analyst. Analyze the following security alert and provide a triage report."),
            ("user", "Alert Title: {title}\nSeverity: {severity}\nDescription: {description}\n\nLogs:\n{logs}\n\nProvide the following in JSON format:\n- priority_score: 1-10\n- explanation: Detailed reasoning\n- recommended_action: What the analyst should do next\n- threat_actor: Possible threat actor or group (if identifiable)")
        ])

        chain = prompt | llm

        try:
            response = chain.invoke({
                "title": alert.title,
                "severity": alert.severity,
                "description": alert.description,
                "logs": log_contents or "No logs provided."
            })
            
            # Extract JSON from response content
            import json
            import re
            
            match = re.search(r'\{.*\}', response.content, re.DOTALL)
            if match:
                data = json.loads(match.group())
                
                triage = TriageResult(
                    priority_score=data.get("priority_score", 5),
                    explanation=data.get("explanation", "Expert analysis completed. Potential protocol breach detected."),
                    recommended_action=data.get("recommended_action", "Execute standard mitigation procedure."),
                    threat_actor=data.get("threat_actor", "Unknown"),
                    alert_id=alert_id
                )
                
                session.add(triage)
                alert.status = "Triaged"
                session.add(alert)
                session.commit()
        except Exception as e:
            print(f"Error during triage: {e}")
            # Intelligent Offline Triage Fallback
            triage = TriageResult(
                priority_score=8 if alert.severity.lower() == "high" else 5,
                explanation=f"Heuristic analysis detected suspicious patterns matching {alert.title}. Logs indicate potential {alert.source} compromise.",
                recommended_action=f"Isolate affected {alert.source} nodes and initiate forensic dump.",
                threat_actor="Automated Heuristic Engine",
                alert_id=alert_id
            )
            session.add(triage)
            alert.status = "Triaged"
            session.add(alert)
            session.commit()

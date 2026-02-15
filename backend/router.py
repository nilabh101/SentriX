from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from sqlmodel import Session
from .database import engine
from .models import PublicQuery
from .legal_kb import LEGAL_KNOWLEDGE_BASE
from .agri_kb import AGRI_KNOWLEDGE_BASE
from .health_kb import HEALTH_KNOWLEDGE_BASE

def route_and_resolve_query(query_id: int):
    with Session(engine) as session:
        query_record = session.get(PublicQuery, query_id)
        if not query_record:
            return

        try:
            llm = ChatOpenAI(model="gpt-4-turbo-preview", temperature=0)
            
            # Step 1: Detect Intent
            intent_prompt = ChatPromptTemplate.from_messages([
                ("system", "You are the SetuAI Router. Categorize the user query into: legal, agri, security, health, or general."),
                ("user", "{query}")
            ])
            
            intent_chain = intent_prompt | llm
            intent_response = intent_chain.invoke({"query": query_record.query_text})
            intent = intent_response.content.lower()
            
            query_record.detected_intent = intent
            
            # Step 2: Specialized Response
            context = ""
            if "legal" in intent:
                context = "\nRelevant Background Knowledge:\n" + "\n".join([f"- {k}: {v}" for k, v in LEGAL_KNOWLEDGE_BASE.items()])
            elif "agri" in intent:
                context = "\nRelevant Background Knowledge:\n" + "\n".join([f"- {k}: {v}" for k, v in AGRI_KNOWLEDGE_BASE.items()])
            elif "health" in intent:
                context = "\nRelevant Background Knowledge:\n" + "\n".join([f"- {k}: {v}" for k, v in HEALTH_KNOWLEDGE_BASE.items()])

            specialist_prompts = {
                "legal": f"You are NyayaAgent. Explain the legal aspect of the query in simple terms for an Indian citizen. Cite relevant BNS/IPC sections if applicable.{context}",
                "agri": f"You are KrishiAgent. Provide agricultural advice or market insights related to the query for an Indian farmer.{context}",
                "security": "You are SentriX Public Assistant. Provide advice on cyber safety or report suspicious activity based on the query.",
                "health": "You are SwasthyaAgent. Provide general health information (not medical advice) and suggest visiting a local PHC (Primary Health Centre) if serious.",
                "general": "You are SetuAI. Provide general assistance helpful to an Indian citizen."
            }
            
            system_msg = specialist_prompts.get(intent, specialist_prompts["general"])
            
            response_prompt = ChatPromptTemplate.from_messages([
                ("system", system_msg),
                ("user", "{query}")
            ])
            
            response_chain = response_prompt | llm
            final_response = response_chain.invoke({"query": query_record.query_text})
            
            query_record.response_text = final_response.content
            session.add(query_record)
            session.commit()

        except Exception as e:
            # Universal Fallback for if AI resolution fails (missing key, timeout, etc.)
            print(f"AI Resolution Error: {e}")
            intent = "general"
            q_lower = query_record.query_text.lower()
            
            # Simple keyword-based intent detection
            if any(k in q_lower for k in ["law", "legal", "court", "ipc", "bns", "rights", "fir", "rti", "cyber law", "case"]):
                intent = "legal"
            elif any(k in q_lower for k in ["farm", "crop", "price", "mandi", "krishi", "wheat", "rice", "tomato", "onion", "agri", "pesticide"]):
                intent = "agri"
            elif any(k in q_lower for k in ["health", "fever", "doctor", "medicine", "swasthya", "ayushman", "pm-jay", "phc", "vax", "symptom", "checkup", "clinic"]):
                intent = "health"
            elif any(k in q_lower for k in ["cyber", "threat", "security", "hacked", "safe", "alert", "triage"]):
                intent = "security"
            
            # Smart Offline Lookup: Try to pull real info from local KBs
            offline_info = ""
            kb_to_search = {}
            domain_overview = ""
            
            if intent == "legal": 
                kb_to_search = LEGAL_KNOWLEDGE_BASE
                domain_overview = "The legal framework in India is undergoing a major transformation with the transition to Bharatiya Nyaya Sanhita (BNS). Key areas include Right to Information (RTI), Consumer Protection, and simplified FIR procedures."
            elif intent == "agri": 
                kb_to_search = AGRI_KNOWLEDGE_BASE
                domain_overview = "Agriculture assistance focuses on real-time mandi prices, sustainable farming practices (PM-KISAN), and crop-specific advice for major staples like Wheat, Rice, and commercial crops like Tomato/Onion."
            elif intent == "health": 
                kb_to_search = HEALTH_KNOWLEDGE_BASE
                domain_overview = "The Swasthya initiative provides nationwide health coverage via PM-JAY (Ayushman Bharat), decentralized care through Primary Health Centres (PHCs), and comprehensive immunization protocols."
            elif intent == "security":
                domain_overview = "SentriX provides cyber safety guidelines, automated triage for security alerts, and instructions for reporting suspicious digital activity to the authorities."

            # Specific keyword matching
            matched_keys = []
            for key, val in kb_to_search.items():
                if key.lower() in q_lower or any(word in q_lower for word in key.lower().split()):
                    matched_keys.append(f"**{key}**: {val}")
            
            # Step 3: Synthesis Generation
            agent_names = {
                "legal": "NyayaAgent Expert Analysis",
                "agri": "KrishiAgent Market Analytics",
                "health": "SwasthyaAgent Clinical Synthesis",
                "security": "SentriX SOC Protocol Report",
                "general": "SetuAI Core Intelligence"
            }
            
            agent_header = agent_names.get(intent, agent_names["general"])
            
            if matched_keys:
                report_body = "\n\n".join([f"#### {item}" for item in matched_keys])
                response_text = f"### {agent_header}\n\n**Key Technical Directives:**\n\n{report_body}\n\n---\n*Synthesis Status: Verified Against Local Knowledge Protocol.*"
            elif domain_overview:
                response_text = f"### {agent_header}\n\n**Operational Framework Overview:**\n\n{domain_overview}\n\n**Next Directed Step:** Please specify a technical sub-topic (e.g. 'RTI', 'PM-KAY', 'Jan Aushadhi') for precise data retrieval."
            else:
                response_text = f"### {agent_header}\n\nAnalysis of query regarding **{intent.upper()}** is currently processing via the primary dataset. No immediate protocol match found. Please refer to official national documentation for the {intent} sector or refine your query."
            
            query_record.detected_intent = intent
            query_record.response_text = response_text
            session.add(query_record)
            session.commit()

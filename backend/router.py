from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from sqlmodel import Session
from .database import engine
from .models import PublicQuery
from .legal_kb import LEGAL_KNOWLEDGE_BASE
from .agri_kb import AGRI_KNOWLEDGE_BASE

def route_and_resolve_query(query_id: int):
    with Session(engine) as session:
        query_record = session.get(PublicQuery, query_id)
        if not query_record:
            return

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
        
        # Step 2: Specialized Response (Simulated for MVP expansion)
        context = ""
        if intent == "legal":
            context = "\nRelevant Background Knowledge:\n" + "\n".join([f"- {k}: {v}" for k, v in LEGAL_KNOWLEDGE_BASE.items()])
        elif intent == "agri":
            context = "\nRelevant Background Knowledge:\n" + "\n".join([f"- {k}: {v}" for k, v in AGRI_KNOWLEDGE_BASE.items()])

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

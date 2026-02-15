from sqlmodel import Session
from .database import engine, init_db
from .models import Alert, SourceLog, LegalQuery, AgriInquiry, PublicQuery
from sqlmodel import select

def seed():
    init_db()
    with Session(engine) as session:
        # Check if already seeded using modern SQLModel syntax
        if session.exec(select(Alert)).first():
            print("Database already has data.")
            return

        # --- Security Alerts ---
        alert1 = Alert(
            title="Multiple Failed SSH Logins",
            severity="High",
            source="AuthLog",
            description="Detected 50+ failed login attempts for user 'root' from IP 192.168.1.105 within 2 minutes."
        )
        session.add(alert1)
        session.commit()
        session.refresh(alert1)
        
        log1 = SourceLog(content="Feb 15 20:30:12 master sshd[1234]: Failed password for root from 192.168.1.105 port 54322 ssh2", alert_id=alert1.id)
        session.add(log1)

        alert2 = Alert(
            title="Unusual API Volume",
            severity="Medium",
            source="CloudTrail",
            description="IAM user 'dev-deployer' performed 500+ DescribeInstances calls in 5 seconds."
        )
        session.add(alert2)
        session.commit()
        session.refresh(alert2)

        log2 = SourceLog(content="{\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"DescribeInstances\",\"userIdentity\":{\"type\":\"IAMUser\",\"userName\":\"dev-deployer\"}}", alert_id=alert2.id)
        session.add(log2)

        # --- Legal Queries ---
        lq1 = LegalQuery(
            user_query="What are my rights during a traffic stop?",
            simplified_explanation="Under the Motor Vehicle Act, you have the right to ask for ID from the officer and receive a proper receipt for any fine. Zero FIR applies if the incident is in another jurisdiction.",
            status="Resolved"
        )
        session.add(lq1)

        # --- Agri Inquiries ---
        ai1 = AgriInquiry(
            subject="Wheat Leaf Rust",
            details="Brown pustules appearing on leaves in Haryana field.",
            ai_advice="This looks like Brown Rust. Use Tilt (Propiconazole) or consult your local KVK for bio-control options.",
            status="Resolved"
        )
        session.add(ai1)

        # --- Historical Public Queries (For Hub Analytics) ---
        pq1 = PublicQuery(
            query_text="How to apply for Ayushman Bharat?",
            detected_intent="health",
            response_text="You can apply via the PM-JAY portal or at any Common Service Centre (CSC). Bring your Aadhaar and Ration card."
        )
        pq2 = PublicQuery(
            query_text="Latest wheat price in Punjab mandi",
            detected_intent="agri",
            response_text="The current MSP for wheat is ₹2,275/quintal. Local market prices in Punjab are hovering around ₹2,350/quintal."
        )
        session.add(pq1)
        session.add(pq2)

        session.commit()
        print("Database seeded with sample alerts, legal, agri, and public queries.")

if __name__ == "__main__":
    seed()

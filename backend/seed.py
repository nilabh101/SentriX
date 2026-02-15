from sqlmodel import Session
from .database import engine, init_db
from .models import Alert, SourceLog

def seed():
    init_db()
    with Session(engine) as session:
        # Check if already seeded
        if session.query(Alert).first():
            print("Database already has data.")
            return

        # Sample Alert 1: SSH Brute Force
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

        # Sample Alert 2: Suspicious API Access
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

        session.commit()
        print("Database seeded with sample alerts.")

if __name__ == "__main__":
    seed()

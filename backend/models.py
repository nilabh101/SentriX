from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

# --- Shared Base ---
class BaseRecord(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

# --- Security (SentriX) ---
class Alert(BaseRecord, table=True):
    title: str
    severity: str
    status: str = "Pending"
    source: str
    description: str
    logs: List["SourceLog"] = Relationship(back_populates="alert")
    triage: Optional["TriageResult"] = Relationship(back_populates="alert")

class SourceLog(BaseRecord, table=True):
    content: str
    alert_id: int = Field(foreign_key="alert.id")
    alert: Alert = Relationship(back_populates="logs")

class TriageResult(BaseRecord, table=True):
    priority_score: int
    explanation: str
    recommended_action: str
    threat_actor: Optional[str] = None
    alert_id: int = Field(foreign_key="alert.id")
    alert: Alert = Relationship(back_populates="triage")

# --- Legal (NyayaAgent) ---
class LegalQuery(BaseRecord, table=True):
    user_query: str
    simplified_explanation: Optional[str] = None
    relevant_sections: Optional[str] = None # JSON string or list of codes
    status: str = "Pending"

# --- Agriculture (KrishiAgent) ---
class AgriInquiry(BaseRecord, table=True):
    subject: str # e.g., "Wheat disease", "Tomato prices"
    details: str
    ai_advice: Optional[str] = None
    market_data: Optional[str] = None # JSON string
    status: str = "Pending"

# --- Generic Hub Routes ---
class PublicQuery(BaseRecord, table=True):
    query_text: str
    detected_intent: Optional[str] = None # legal, agri, security, health, general
    response_text: Optional[str] = None

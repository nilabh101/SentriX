from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from typing import List
from .database import init_db, get_session
from .models import Alert, TriageResult, SourceLog, PublicQuery
from .triage_agent import triage_alert
from .router import route_and_resolve_query
from .seed import seed

app = FastAPI(title="SetuAI Public Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()
    seed()

@app.get("/")
async def root():
    return {"message": "SetuAI Public Assistant API is active"}

# --- Public Hub Queries ---
@app.post("/query")
async def create_query(query_text: str, background_tasks: BackgroundTasks, session: Session = Depends(get_session)):
    db_query = PublicQuery(query_text=query_text)
    session.add(db_query)
    session.commit()
    session.refresh(db_query)
    background_tasks.add_task(route_and_resolve_query, db_query.id)
    return {"message": "Query received and is being processed", "query_id": db_query.id}

@app.get("/query/{query_id}")
def get_query(query_id: int, session: Session = Depends(get_session)):
    query = session.get(PublicQuery, query_id)
    if not query:
        raise HTTPException(status_code=404, detail="Query not found")
    return query

# --- SentriX (Security) ---
@app.post("/alerts", response_model=Alert)
def create_alert(alert: Alert, session: Session = Depends(get_session)):
    session.add(alert)
    session.commit()
    session.refresh(alert)
    return alert

@app.get("/alerts", response_model=List[Alert])
def read_alerts(session: Session = Depends(get_session)):
    alerts = session.exec(select(Alert)).all()
    return alerts

@app.get("/alerts/{alert_id}")
def read_alert(alert_id: int, session: Session = Depends(get_session)):
    alert = session.get(Alert, alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@app.post("/alerts/{alert_id}/triage")
async def start_triage(alert_id: int, background_tasks: BackgroundTasks, session: Session = Depends(get_session)):
    alert = session.get(Alert, alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    background_tasks.add_task(triage_alert, alert_id)
    return {"message": "Triage process started in background"}

@app.get("/alerts/{alert_id}/triage", response_model=TriageResult)
def get_triage(alert_id: int, session: Session = Depends(get_session)):
    statement = select(TriageResult).where(TriageResult.alert_id == alert_id)
    result = session.exec(statement).first()
    if not result:
        raise HTTPException(status_code=404, detail="Triage results not found")
    return result

export const API_BASE_URL = "http://localhost:8000";

export interface Alert {
  id: number;
  title: string;
  severity: string;
  status: string;
  source: string;
  description: string;
  timestamp: string;
}

export interface Triage {
  id: number;
  priority_score: number;
  explanation: string;
  recommended_action: string;
  threat_actor?: string;
}

export const fetchAlerts = async (): Promise<Alert[]> => {
  const res = await fetch(`${API_BASE_URL}/alerts`);
  if (!res.ok) throw new Error("Failed to fetch alerts");
  return res.json();
};

export const fetchTriage = async (alertId: number): Promise<Triage> => {
  const res = await fetch(`${API_BASE_URL}/alerts/${alertId}/triage`);
  if (!res.ok) throw new Error("Failed to fetch triage");
  return res.json();
};

export const startTriage = async (alertId: number): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/alerts/${alertId}/triage`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to start triage");
};

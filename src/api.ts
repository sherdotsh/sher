import { API_URL, VERSION } from "./constants.js";
import { getAuth } from "./auth.js";

interface DeployInfo {
  id: string;
  url: string;
  createdAt: string;
  expiresAt: string;
  fileCount: number;
  hasPassword: boolean;
}

export async function listDeploys(): Promise<DeployInfo[]> {
  const auth = getAuth();
  if (!auth) throw new Error("Login required. Run `sher login` first.");

  const res = await fetch(`${API_URL}/api/deployments`, {
    headers: { Authorization: `Bearer ${auth.token}`, "X-Sher-Version": VERSION },
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as {
      error?: { message?: string };
    } | null;
    throw new Error(data?.error?.message ?? `Request failed (${res.status})`);
  }

  const data = (await res.json()) as { deployments: DeployInfo[] };
  return data.deployments;
}

export async function deleteDeploy(id: string): Promise<void> {
  const auth = getAuth();
  if (!auth) throw new Error("Login required. Run `sher login` first.");

  const res = await fetch(`${API_URL}/api/deployments/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${auth.token}`, "X-Sher-Version": VERSION },
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as {
      error?: { message?: string };
    } | null;
    throw new Error(data?.error?.message ?? `Delete failed (${res.status})`);
  }
}

export async function createCheckout(): Promise<{ url: string }> {
  const auth = getAuth();
  if (!auth) throw new Error("Login required. Run `sher login` first.");

  const res = await fetch(`${API_URL}/api/checkout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${auth.token}`, "X-Sher-Version": VERSION },
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as {
      error?: { message?: string };
    } | null;
    throw new Error(data?.error?.message ?? `Checkout failed (${res.status})`);
  }

  return (await res.json()) as { url: string };
}

interface PreflightResult {
  allowed: boolean;
  used: number;
  limit: number;
  tier: string;
  resetsAt: string;
}

export async function checkPreflight(): Promise<PreflightResult> {
  const headers: Record<string, string> = { "X-Sher-Version": VERSION };
  const auth = getAuth();
  if (auth) {
    headers["Authorization"] = `Bearer ${auth.token}`;
  }

  const res = await fetch(`${API_URL}/api/preflight`, { headers });

  if (!res.ok) {
    throw new Error(`Preflight check failed (${res.status})`);
  }

  return (await res.json()) as PreflightResult;
}

interface SubscriptionInfo {
  tier: string;
  subscription: { status: string; polarSubId: string } | null;
}

export async function getSubscription(): Promise<SubscriptionInfo> {
  const auth = getAuth();
  if (!auth) throw new Error("Login required. Run `sher login` first.");

  const res = await fetch(`${API_URL}/api/subscription`, {
    headers: { Authorization: `Bearer ${auth.token}`, "X-Sher-Version": VERSION },
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as {
      error?: { message?: string };
    } | null;
    throw new Error(data?.error?.message ?? `Request failed (${res.status})`);
  }

  return (await res.json()) as SubscriptionInfo;
}

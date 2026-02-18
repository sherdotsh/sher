import { API_URL } from "./constants.js";
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
    headers: { Authorization: `Bearer ${auth.token}` },
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
    headers: { Authorization: `Bearer ${auth.token}` },
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as {
      error?: { message?: string };
    } | null;
    throw new Error(data?.error?.message ?? `Delete failed (${res.status})`);
  }
}

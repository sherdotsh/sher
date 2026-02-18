import { API_URL, VERSION } from "./constants.js";
import { getAuth } from "./auth.js";
import type { FileMap } from "./collect.js";

interface UploadResponse {
  url: string;
  id: string;
  expires: string;
}

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    authenticated?: boolean;
    [key: string]: unknown;
  };
}

export async function uploadFiles(
  files: FileMap,
  ttlHours: number,
  password?: string
): Promise<{ url: string; expires: string }> {
  const body = JSON.stringify({ files, ttl: ttlHours, password });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Sher-Version": VERSION,
  };

  const auth = getAuth();
  if (auth) {
    headers["Authorization"] = `Bearer ${auth.token}`;
  }

  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    headers,
    body,
  });

  if (!res.ok) {
    let message: string;
    try {
      const data = (await res.json()) as ErrorResponse;
      message = data.error.message;
    } catch {
      message = `Upload failed (${res.status})`;
    }
    throw new Error(message);
  }

  const data = (await res.json()) as UploadResponse;
  return { url: data.url, expires: data.expires };
}

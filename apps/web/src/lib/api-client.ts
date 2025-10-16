const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3333';

interface FetchOptions extends RequestInit {
  token?: string;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  rating: number;
  rank: number;
}

export interface SoloMatchResponse {
  match: {
    id: string;
  };
}

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined)
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const apiClient = {
  verifyWorldId(body: unknown) {
    return apiFetch<{token: string; user: unknown}>('/auth/world-id/verify', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  },
  getMe(token: string) {
    return apiFetch<{user: unknown}>('/auth/me', {token});
  },
  listProblems(token?: string) {
    return apiFetch('/problems', token ? {token} : {});
  },
  getLeaderboard() {
    return apiFetch<LeaderboardEntry[]>('/leaderboard');
  },
  createSoloMatch(token: string) {
    return apiFetch<SoloMatchResponse>('/matches/solo', {
      method: 'POST',
      token
    });
  }
};

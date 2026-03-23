import { API_URL } from './config';
import { authClient } from './auth-client';
import { ApiError } from './api-errors';

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
};

export type Profile = {
  id: string;
  userId: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  timezone: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MeResponse = {
  user: User;
  profile: Profile | null;
};

export type UpdateProfileInput = {
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  timezone?: string;
};

export type Device = {
  id: string;
  userId: string;
  platform: string;
  pushToken: string;
  deviceName: string | null;
  lastActiveAt: string | null;
  createdAt: string;
};

// ─── Query Keys ─────────────────────────────────────────────────────────────
export const apiKeys = {
  me: ['me'] as const,
  devices: ['devices'] as const,
} as const;

// ─── Fetch with Auth ────────────────────────────────────────────────────────

async function fetchWithAuth<T>(
  path: string,
  options: RequestInit & { signal?: AbortSignal } = {}
): Promise<T> {
  const { signal, ...rest } = options;
  const cookies = authClient.getCookie();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (cookies) {
    (headers as Record<string, string>)['Cookie'] = cookies;
  }

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...rest,
      headers,
      credentials: 'omit',
      signal,
    });

    let json: unknown;
    try {
      const text = await res.text();
      json = text ? JSON.parse(text) : {};
    } catch {
      throw new ApiError(
        res.ok ? 'Invalid JSON response' : `HTTP ${res.status}`,
        res.status,
        'INVALID_JSON'
      );
    }

    if (!res.ok) {
      const err = json as { message?: string; error?: string };
      throw new ApiError(
        err.message ?? err.error ?? 'Request failed',
        res.status,
        err.error as string | undefined
      );
    }

    return json as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof Error) {
      if (err.name === 'AbortError') throw err;
      throw new ApiError(err.message, 0, 'NETWORK_ERROR');
    }
    throw new ApiError('Network error', 0, 'NETWORK_ERROR');
  }
}

// ─── User / Profile API ──────────────────────────────────────────────────────

export async function getMe(signal?: AbortSignal): Promise<MeResponse> {
  const res = await fetchWithAuth<{ success: true; data: MeResponse }>(
    '/api/v1/users/me',
    { signal }
  );
  return res.data;
}

export async function updateProfile(input: UpdateProfileInput): Promise<Profile> {
  const res = await fetchWithAuth<{ success: true; data: { profile: Profile } }>(
    '/api/v1/users/me',
    {
      method: 'PATCH',
      body: JSON.stringify(input),
    }
  );
  return res.data.profile;
}

// ─── Devices API ─────────────────────────────────────────────────────────────

export async function listDevices(
  signal?: AbortSignal
): Promise<{ devices: Device[] }> {
  const res = await fetchWithAuth<{
    success: true;
    data: { devices: Device[] };
  }>('/api/v1/devices', { signal });
  return res.data;
}

export async function registerDevice(input: {
  platform: 'ios' | 'android';
  pushToken: string;
  deviceName?: string;
}): Promise<{ device: Device; created: boolean }> {
  const res = await fetchWithAuth<{
    success: true;
    data: { device: Device; created: boolean };
  }>('/api/v1/devices', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return res.data;
}

export async function deleteDevice(id: string): Promise<{ deleted: boolean }> {
  const res = await fetchWithAuth<{
    success: true;
    data: { deleted: boolean };
  }>(`/api/v1/devices/${id}`, { method: 'DELETE' });
  return res.data;
}

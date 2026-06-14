import { apiUrl } from "@/shared";
import { fallbackUsers } from "./ fallbacks";

export type User = {
  id?: string;
  email: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
};

export type DirectoryUser = {
  id: string;
  name: string;
  email: string;
  lastLogin: string;
  status: 'Active' | 'Inactive';
  sso: 'Enabled' | 'Disabled';
};

const titleCase = (value: string) =>
  value
    .replace(/[._-]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const readString = (value: unknown) => (typeof value === 'string' ? value : undefined);


export async function getUsers(
  token?: string,
): Promise<DirectoryUser[]> {
  const headers: Record<string, string> = {};
  if (token) {
    headers['Accept'] = 'application/json';
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const limit = 10, offset=0;

    const response = await fetch(`${apiUrl}/users?limit=${limit}&offset=${offset}`, {
      cache: 'no-store',
      headers,
    });

    if (!response.ok) return fallbackUsers;

    const payload = (await response.json()) as { entries?: User[] };
    const entries = payload.entries ?? [];

    if (!entries.length) return fallbackUsers;

    return entries.map((user, index) => {
      const localPart = user.email.split('@')[0] ?? 'user';
      const metadata = user.metadata ?? {};
      const name = readString(metadata.name) ?? titleCase(localPart);
      const lastLoginSource = readString(metadata.lastLogin) ?? user.createdAt;

      return {
        id: user.id ?? `${index}`,
        name,
        email: user.email,
        lastLogin: lastLoginSource
          ? new Date(lastLoginSource).toLocaleString('en-US')
          : 'Never',
        status: readString(metadata.status) === 'Inactive' ? 'Inactive' : 'Active',
        sso: readString(metadata.sso) === 'Disabled' ? 'Disabled' : 'Enabled',
        isCurrent: user.email.toLowerCase().includes('pablo'),
      };
    });
  } catch {
    return fallbackUsers;
  }
}


export async function getMe(
  token?: string,
): Promise<User> {
  const headers: Record<string, string> = {};
  if (token) {
    headers['Accept'] = 'application/json';
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${apiUrl}/users/me`, {
      cache: 'no-store',
      headers,
    });

    if (!response.ok) return fallbackUsers[0];

    const payload = (await response.json());
    return payload;
  } catch {
    return fallbackUsers[0];
  }
}
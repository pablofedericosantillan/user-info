export type ApiUser = {
  id?: string;
  _id?: string;
  email: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
};

export type DirectoryUser = {
  id: string;
  name: string;
  role: string;
  email: string;
  lastLogin: string;
  status: 'Active' | 'Inactive';
  sso: 'Enabled' | 'Disabled';
  isCurrent?: boolean;
};

const fallbackUsers: DirectoryUser[] = [
  {
    id: '1',
    name: 'Administrator',
    role: 'Admin',
    email: 'laboratory@portero.ai',
    lastLogin: '5/8/2026, 4:22:31 PM',
    status: 'Active',
    sso: 'Disabled',
  },
  {
    id: '2',
    name: 'Alberto Herrera',
    role: 'Admin',
    email: 'alberto.herrera@portero.ai',
    lastLogin: '5/29/2026, 6:31:19 PM',
    status: 'Active',
    sso: 'Enabled',
  },
  {
    id: '3',
    name: 'Anat Garty',
    role: 'Admin',
    email: 'anat.garty@portero.ai',
    lastLogin: '5/25/2026, 10:19:49 AM',
    status: 'Active',
    sso: 'Enabled',
  },
  {
    id: '4',
    name: 'Lucas Bonastre',
    role: 'Admin',
    email: 'lucas.bonastre@portero.ai',
    lastLogin: '6/1/2026, 2:05:39 PM',
    status: 'Active',
    sso: 'Enabled',
  },
  {
    id: '5',
    name: 'Pablo Santillan',
    role: 'Admin',
    email: 'pablo.santillan@portero.ai',
    lastLogin: '6/2/2026, 7:23:49 PM',
    status: 'Active',
    sso: 'Enabled',
    isCurrent: true,
  },
];

const titleCase = (value: string) =>
  value
    .replace(/[._-]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const readString = (value: unknown) => (typeof value === 'string' ? value : undefined);

export async function fetchDirectoryUsers(): Promise<DirectoryUser[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

  try {
    const response = await fetch(`${apiUrl}/users?limit=50&offset=0`, {
      cache: 'no-store',
    });

    if (!response.ok) return fallbackUsers;

    const payload = (await response.json()) as { entries?: ApiUser[] };
    const entries = payload.entries ?? [];

    if (!entries.length) return fallbackUsers;

    return entries.map((user, index) => {
      const localPart = user.email.split('@')[0] ?? 'user';
      const metadata = user.metadata ?? {};
      const name = readString(metadata.name) ?? titleCase(localPart);
      const lastLoginSource = readString(metadata.lastLogin) ?? user.createdAt;

      return {
        id: user.id ?? user._id ?? `${index}`,
        name,
        role: readString(metadata.role) ?? 'Admin',
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


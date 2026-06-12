const SESSION_KEY = 'user-manage-server-session';

export type Session = { token: string; email: string; loggedAt: string };

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(token: string, email: string): void {
  window.localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ token, email, loggedAt: new Date().toISOString() }),
  );
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_KEY);
}

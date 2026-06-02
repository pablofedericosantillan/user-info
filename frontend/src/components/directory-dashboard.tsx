'use client';

import { MoreHorizontal, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import type { DirectoryUser } from '@/lib/users';

type DirectoryDashboardProps = {
  users: DirectoryUser[];
};

export function DirectoryDashboard({ users }: DirectoryDashboardProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const session = window.localStorage.getItem('user-manage-server-session');

    if (!session) {
      router.replace('/login');
      return;
    }

    setIsReady(true);
  }, [router]);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return users.filter((user) =>
      [user.name, user.email, user.status, user.sso]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query, users]);

  const logout = () => {
    window.localStorage.removeItem('user-manage-server-session');
    router.replace('/login');
  };

  if (!isReady) {
    return <main className="dashboard-shell" />;
  }

  return (
    <main className="dashboard-shell">
      <section className="directory">
        <div className="directory-header">
          <div>
            <h1>User Directory</h1>
            <p>View and manage all user accounts</p>
          </div>
          <button className="logout-button" type="button" onClick={logout}>
            Log out
          </button>
        </div>

        <div className="search-form">
          <Search aria-hidden="true" size={18} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or email..."
          />
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th className="sorted">User ▲</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Status</th>
                <th>SSO</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span className="user-name">{user.name}</span>
                    {user.isCurrent ? <span className="you-badge">You</span> : null}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <span className={`sso-badge ${user.sso.toLowerCase()}`}>
                      {user.sso}
                    </span>
                  </td>
                  <td>
                    <button className="icon-button" aria-label={`Open ${user.name} actions`}>
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

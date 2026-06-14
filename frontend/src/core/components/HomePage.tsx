'use client';

import { MoreHorizontal, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { getSession, clearSession } from '@/core/lib/auth';
import { getUsers, type DirectoryUser } from '@/core/lib/users';

export function HomePage() {
  const router = useRouter();
  const [users, setUsers] = useState<DirectoryUser[]>([]);
  const [query, setQuery] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const session = getSession();

    if (!session) {
      router.replace('/login');
      return;
    }

    getUsers(session.token)
      .then(setUsers)
      .finally(() => setIsReady(true));
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
                <th>Email</th>
                <th>Last Login</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
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

'use client';

import { Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export function LoginForm() {
  const router = useRouter();

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.setItem(
      'user-info-session',
      JSON.stringify({
        email: 'pablo.santillan@portero.ai',
        loggedAt: new Date().toISOString(),
      }),
    );
    router.push('/');
  };

  return (
    <form className="login-form" onSubmit={login}>
      <label>
        <span>Email</span>
        <div className="field">
          <Mail aria-hidden="true" size={18} />
          <input type="email" defaultValue="pablo.santillan@portero.ai" />
        </div>
      </label>

      <label>
        <span>Password</span>
        <div className="field">
          <Lock aria-hidden="true" size={18} />
          <input type="password" defaultValue="password" />
        </div>
      </label>

      <button className="primary-button" type="submit">
        Sign in
      </button>
    </form>
  );
}


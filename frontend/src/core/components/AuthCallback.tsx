'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setSession } from '@/core/lib/auth';

function CallbackHandler() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get('token');
    if (!token) {
      router.replace('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]!)) as {
        email: string;
      };
      setSession(token, payload.email);
    } catch {
      setSession(token, '');
    }

    router.replace('/');
  }, [params, router]);

  return null;
}

export default function AuthCallback() {
  return (
    <main
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Suspense>
        <CallbackHandler />
      </Suspense>
      <p>Authenticating...</p>
    </main>
  );
}

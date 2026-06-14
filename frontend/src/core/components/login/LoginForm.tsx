'use client';

import { apiUrl } from "@/shared";

export function LoginForm() {
  const handleGoogleLogin = () => {
    window.location.href = `${apiUrl}/auth/google/login`;
  };

  return (
    <div className="login-form">
      <button className="primary-button" type="button" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}

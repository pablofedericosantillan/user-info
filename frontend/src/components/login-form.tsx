'use client';

export function LoginForm() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

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

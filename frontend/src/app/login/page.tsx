import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <main className="login-shell">
      <section className="login-panel">
        <div className="brand-mark">UI</div>
        <h1>Sign in</h1>
        <p>Access the user directory dashboard.</p>

        <LoginForm />
      </section>
    </main>
  );
}

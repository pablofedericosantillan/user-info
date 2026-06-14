import { LoginForm } from "./LoginForm";

export default function Login() {
  return (
    <main className="login-shell">
      <section className="login-panel">
        <h1>Sign in</h1>
        <p>Access the user directory dashboard.</p>

        <LoginForm />
      </section>
    </main>
  );
}

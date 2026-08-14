import AuthShell from "@/components/auth/auth-shell";
import LoginForm from "@/components/auth/loginForm";

export default function AdminLoginPage() {
  return (
    <AuthShell title="Giriş Yap" description="Yönetim paneline erişmek için hesabınla giriş yap.">
      <LoginForm />
    </AuthShell>
  );
}

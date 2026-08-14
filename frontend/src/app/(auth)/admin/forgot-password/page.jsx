import AuthShell from "@/components/auth/auth-shell";
import ForgotPasswordForm from "@/components/auth/forgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Şifremi Unuttum" description="Email adresine sıfırlama bağlantısı gönderilir.">
      <ForgotPasswordForm />
    </AuthShell>
  );
}

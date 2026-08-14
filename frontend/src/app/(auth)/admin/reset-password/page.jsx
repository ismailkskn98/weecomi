import AuthShell from "@/components/auth/auth-shell";
import ResetPasswordForm from "@/components/auth/resetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Şifre Yenile" description="Yeni şifreni belirle.">
      <ResetPasswordForm />
    </AuthShell>
  );
}

import ForgotPasswordForm from "@/components/auth/forgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800">Şifremi Unuttum</h1>
        <p className="mt-2 text-sm text-slate-500">Email adresine sıfırlama bağlantısı gönderilir.</p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}

import ResetPasswordForm from "@/components/auth/resetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800">Şifre Yenile</h1>
        <p className="mt-2 text-sm text-slate-500">Yeni şifreni belirle.</p>
        <ResetPasswordForm />
      </div>
    </div>
  );
}

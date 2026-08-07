import LoginForm from "@/components/auth/loginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase text-[#346C92]">WeeComi Admin</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-800">Giriş Yap</h1>
        <p className="mt-2 text-sm text-slate-500">Yönetim paneline erişmek için hesabınla giriş yap.</p>
        <LoginForm />
      </div>
    </div>
  );
}

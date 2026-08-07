"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAdmin } from "@/lib/api/auth";
import { useToast } from "@/components/ui/toast";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginAdmin({ email, password });
      toast({ title: "Giriş başarılı", description: "Admin paneline yönlendiriliyorsun." });
      router.replace("/admin/dashboard");
    } catch (err) {
      const message = err.response?.data?.error || "Giriş yapılamadı.";
      setError(message);
      toast({ title: "Giriş yapılamadı", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-[#346C92]"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Şifre</label>
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-[#346C92]"
        />
      </div>
      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#346C92] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2c5a7a] disabled:opacity-60"
      >
        {loading ? "Giriş yapılıyor..." : "Giriş yap"}
      </button>
      <Link href="/admin/forgot-password" className="block text-center text-sm font-semibold text-[#346C92]/70">
        Şifremi unuttum
      </Link>
    </form>
  );
}

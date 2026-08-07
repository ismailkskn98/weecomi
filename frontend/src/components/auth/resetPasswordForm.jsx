"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { resetAdminPassword } from "@/lib/api/auth";
import { useToast } from "@/components/ui/toast";

function ResetPasswordFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token") || "";

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await resetAdminPassword({ token, password });
      toast({ title: "Şifre güncellendi", description: "Yeni şifrenle giriş yapabilirsin." });
      router.replace("/admin/login");
    } catch (err) {
      toast({
        title: "İşlem başarısız",
        description: err.response?.data?.error || "Şifre güncellenemedi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Yeni şifre</label>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-[#346C92]"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !token}
        className="w-full rounded-xl bg-[#346C92] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Kaydediliyor..." : "Şifreyi güncelle"}
      </button>
      <Link href="/admin/login" className="block text-center text-sm font-semibold text-[#346C92]/70">
        Girişe dön
      </Link>
    </form>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<p className="mt-8 text-sm text-slate-500">Yükleniyor...</p>}>
      <ResetPasswordFormInner />
    </Suspense>
  );
}

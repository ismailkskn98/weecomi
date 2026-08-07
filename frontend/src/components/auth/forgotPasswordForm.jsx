"use client";

import Link from "next/link";
import { useState } from "react";
import { requestPasswordReset } from "@/lib/api/auth";
import { useToast } from "@/components/ui/toast";

export default function ForgotPasswordForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await requestPasswordReset(email);
      toast({
        title: "İstek alındı",
        description: data.resetUrl ? `Dev: ${data.resetUrl}` : "Email kontrol et.",
      });
    } catch (err) {
      toast({
        title: "İşlem başarısız",
        description: err.response?.data?.error || "İstek gönderilemedi.",
        variant: "destructive",
      });
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
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#346C92] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Gönderiliyor..." : "Sıfırlama bağlantısı gönder"}
      </button>
      <Link href="/admin/login" className="block text-center text-sm font-semibold text-[#346C92]/70">
        Girişe dön
      </Link>
    </form>
  );
}

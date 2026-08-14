"use client";

import Link from "next/link";
import { useState } from "react";
import { requestPasswordReset } from "@/lib/api/auth";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-weecomi-dark-gray">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 bg-white px-3.5 text-base md:text-base"
        />
      </div>
      <Button type="submit" disabled={loading} className="h-12 w-full rounded-md font-heading text-sm font-medium">
        {loading ? "Gönderiliyor..." : "Sıfırlama bağlantısı gönder"}
      </Button>
      <Link
        href="/admin/login"
        className="block text-center font-heading text-sm text-weecomi-blue underline decoration-weecomi-blue/35 underline-offset-4 transition hover:text-weecomi-orange hover:decoration-weecomi-orange"
      >
        Girişe dön
      </Link>
    </form>
  );
}

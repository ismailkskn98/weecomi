"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { resetAdminPassword } from "@/lib/api/auth";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

function ResetPasswordFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-weecomi-dark-gray">
          Yeni şifre
        </label>
        <InputGroup className="h-12 bg-white">
          <InputGroupInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 px-3.5 text-base md:text-base"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              size="icon-sm"
              aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
              onClick={() => setShowPassword((open) => !open)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <Button type="submit" disabled={loading || !token} className="h-12 w-full rounded-md font-heading text-sm font-medium">
        {loading ? "Kaydediliyor..." : "Şifreyi güncelle"}
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

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<p className="text-sm text-weecomi-dark-gray/70">Yükleniyor...</p>}>
      <ResetPasswordFormInner />
    </Suspense>
  );
}

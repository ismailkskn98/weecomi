"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginAdmin } from "@/lib/api/auth";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
          aria-invalid={Boolean(error)}
          className="h-12 bg-white px-3.5 text-base md:text-base"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-weecomi-dark-gray">
          Şifre
        </label>
        <InputGroup className="h-12 bg-white">
          <InputGroupInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(error)}
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
      {error ? (
        <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={loading} className="h-12 w-full rounded-md font-heading text-sm font-medium">
        {loading ? "Giriş yapılıyor..." : "Giriş yap"}
      </Button>
      <Link
        href="/admin/forgot-password"
        className="block text-center font-heading text-sm text-weecomi-blue underline decoration-weecomi-blue/35 underline-offset-4 transition hover:text-weecomi-orange hover:decoration-weecomi-orange"
      >
        Şifremi unuttum
      </Link>
    </form>
  );
}

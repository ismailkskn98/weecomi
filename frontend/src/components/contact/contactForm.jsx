"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { products } from "@/data/products";

/** Hikari contact form: label above, 44px inputs, 2-col rows, orange CTA */
const inputClass =
  "h-11 w-full rounded-lg border border-black/[0.1] bg-white px-3.5 text-sm text-weecomi-dark-gray outline-none transition placeholder:text-muted-foreground/60 focus:border-weecomi-orange";

export default function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const schema = useMemo(
    () =>
      z.object({
        fullName: z.string().trim().min(2, t("errors.fullName")),
        email: z.string().trim().email(t("errors.email")),
        phone: z.string().trim().min(7, t("errors.phone")),
        company: z.string().trim().optional(),
        productInterest: z.string().trim().min(1, t("errors.product")),
        message: z.string().trim().min(10, t("errors.message")),
        consent: z.boolean().refine((value) => value === true, { message: t("errors.consent") }),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      productInterest: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(values) {
    setStatus("idle");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setServerError(data.error || t("error"));
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setServerError(t("error"));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-weecomi-dark-gray">
              {t("fullName")}
            </label>
            <input id="fullName" {...register("fullName")} className={inputClass} autoComplete="name" />
            {errors.fullName ? <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p> : null}
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-weecomi-dark-gray">
              {t("email")}
            </label>
            <input id="email" type="email" {...register("email")} className={inputClass} autoComplete="email" />
            {errors.email ? <p className="mt-1 text-xs text-destructive">{errors.email.message}</p> : null}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-weecomi-dark-gray">
              {t("phone")}
            </label>
            <input id="phone" type="tel" {...register("phone")} className={inputClass} autoComplete="tel" />
            {errors.phone ? <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p> : null}
          </div>
          <div>
            <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-weecomi-dark-gray">
              {t("company")}
            </label>
            <input id="company" {...register("company")} className={inputClass} autoComplete="organization" />
          </div>
        </div>

        <div>
          <label htmlFor="productInterest" className="mb-1.5 block text-sm font-medium text-weecomi-dark-gray">
            {t("productInterest")}
          </label>
          <select id="productInterest" {...register("productInterest")} className={inputClass} defaultValue="">
            <option value="" disabled>
              {t("productPlaceholder")}
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          {errors.productInterest ? <p className="mt-1 text-xs text-destructive">{errors.productInterest.message}</p> : null}
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-weecomi-dark-gray">
            {t("message")}
          </label>
          <textarea
            id="message"
            rows={5}
            {...register("message")}
            className="min-h-[140px] w-full resize-y rounded-lg border border-black/[0.1] bg-white px-3.5 py-2.5 text-sm text-weecomi-dark-gray outline-none transition placeholder:text-muted-foreground/60 focus:border-weecomi-orange"
          />
          {errors.message ? <p className="mt-1 text-xs text-destructive">{errors.message.message}</p> : null}
        </div>

        <label className="flex items-start gap-3 text-sm leading-relaxed text-weecomi-dark-gray">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-0.5 size-4 rounded border-black/20 text-weecomi-orange focus:ring-weecomi-orange"
          />
          <span>{t("consent")}</span>
        </label>
        {errors.consent ? <p className="text-xs text-destructive">{errors.consent.message}</p> : null}
      </div>

      {status === "success" ? (
        <p className="rounded-lg border border-weecomi-orange/25 bg-weecomi-orange/10 px-4 py-3 text-sm text-weecomi-dark-gray" role="status">
          {t("success")}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-[50px] items-center gap-2 rounded-xl bg-weecomi-orange pl-7 pr-6 font-heading text-sm font-medium text-white transition hover:bg-weecomi-orange/90 disabled:opacity-60"
      >
        {isSubmitting ? t("sending") : t("send")}
        {!isSubmitting ? <ArrowRight className="h-5 w-5" aria-hidden /> : null}
      </button>
    </form>
  );
}

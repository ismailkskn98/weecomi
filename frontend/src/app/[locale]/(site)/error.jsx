"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="gridContainer py-24 text-center">
      <h1 className="text-3xl font-bold text-weecomi-dark-gray">Bir şeyler ters gitti</h1>
      <p className="mt-3 text-muted-foreground">Sayfa yüklenirken beklenmeyen bir hata oluştu.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-weecomi-blue px-5 py-2.5 text-sm font-semibold text-white"
        >
          Tekrar dene
        </button>
        <Link href="/" className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-weecomi-dark-gray">
          Ana sayfa
        </Link>
      </div>
    </section>
  );
}

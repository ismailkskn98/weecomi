import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4 py-20">
      <div className="max-w-lg text-center">
        <p className="text-xs font-bold uppercase text-weecomi-blue">404</p>
        <h1 className="mt-3 text-4xl font-bold text-weecomi-dark-gray">Sayfa bulunamadı</h1>
        <p className="mt-4 text-muted-foreground">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir. WeeComi ekosistemine ana sayfadan devam edebilirsiniz.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/tr" className="rounded-md bg-weecomi-blue px-5 py-2.5 text-sm font-semibold text-white">
            Ana sayfaya dön
          </Link>
          <Link href="/tr/contact" className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-weecomi-dark-gray">
            İletişim
          </Link>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      <p className="text-sm text-slate-500">
        WeeComi yönetim paneline hoş geldin. Galeri, haberler ve medya kütüphanesini yan menüden yönetebilirsin.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: "Galeri", href: "/admin/gallery", text: "Görselleri yönet" },
          { title: "Haberler", href: "/admin/news", text: "İçerikleri yayınla" },
          { title: "Medya", href: "/admin/media", text: "Yüklenen dosyalar" },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#346C92]"
          >
            <h2 className="text-lg font-bold text-slate-800">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{card.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

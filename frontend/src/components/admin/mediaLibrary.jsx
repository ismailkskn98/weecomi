"use client";

import { useEffect, useState } from "react";
import { listAdminMedia } from "@/lib/api/media";
import { useToast } from "@/components/ui/toast";

export default function MediaLibrary() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAdminMedia({ page: 1, pageSize: 48 })
      .then((data) => setItems(data.items || []))
      .catch((err) => {
        toast({ title: "Medya yüklenemedi", description: err.response?.data?.error || "Hata", variant: "destructive" });
      })
      .finally(() => setLoading(false));
  }, [toast]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Medya Kütüphanesi</h1>
        <p className="text-sm text-slate-500">Yüklenen görselleri görüntüle.</p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Yükleniyor...</p>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500">
          Henüz medya yok. Galeri veya haber oluştururken görsel yükleyebilirsin.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${item.url})` }} />
              <div className="p-3">
                <p className="truncate text-sm font-semibold text-slate-700">{item.originalName || item.url}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

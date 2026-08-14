"use client";

import { useEffect, useState } from "react";
import {
  deleteAdminContactSubmission,
  listAdminContactSubmissions,
  updateAdminContactSubmission,
} from "@/lib/api/contact";
import { useToast } from "@/components/ui/toast";

const statusOptions = [
  { value: "", label: "Tümü" },
  { value: "NEW", label: "Yeni" },
  { value: "READ", label: "Okundu" },
  { value: "ARCHIVED", label: "Arşiv" },
];

function formatDate(value) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleString("tr-TR");
  } catch {
    return "-";
  }
}

export default function ContactManager() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const data = await listAdminContactSubmissions({ page: 1, pageSize: 50, search, status: status || undefined });
      setItems(data.items || []);
    } catch (err) {
      toast({
        title: "İletişim kayıtları yüklenemedi",
        description: err.response?.data?.error || "Hata",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [status]);

  async function onSearch(event) {
    event.preventDefault();
    await load();
  }

  async function changeStatus(id, nextStatus) {
    try {
      const item = await updateAdminContactSubmission(id, { status: nextStatus });
      setItems((prev) => prev.map((entry) => (entry.id === id ? item : entry)));
      if (selected?.id === id) setSelected(item);
      toast({ title: "Durum güncellendi" });
    } catch (err) {
      toast({
        title: "Durum güncellenemedi",
        description: err.response?.data?.error || "Hata",
        variant: "destructive",
      });
    }
  }

  async function onDelete(id) {
    if (!window.confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;
    try {
      await deleteAdminContactSubmission(id);
      setItems((prev) => prev.filter((entry) => entry.id !== id));
      if (selected?.id === id) setSelected(null);
      toast({ title: "Kayıt silindi" });
    } catch (err) {
      toast({
        title: "Kayıt silinemedi",
        description: err.response?.data?.error || "Hata",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-weecomi-dark-gray">İletişim Formu</h1>
        <p className="mt-1 text-sm text-muted-foreground">Web sitesinden gelen iletişim taleplerini görüntüleyin.</p>
      </div>

      <form onSubmit={onSearch} className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Ad, e-posta veya ürün ara..."
          className="h-10 min-w-[220px] flex-1 rounded-lg border border-black/10 px-3 text-sm"
        />
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-10 rounded-lg border border-black/10 px-3 text-sm"
        >
          {statusOptions.map((option) => (
            <option key={option.value || "all"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit" className="h-10 rounded-lg bg-weecomi-orange px-4 text-sm font-medium text-white">
          Ara
        </button>
      </form>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
          {loading ? <p className="p-4 text-sm text-muted-foreground">Yükleniyor...</p> : null}
          {!loading && !items.length ? <p className="p-4 text-sm text-muted-foreground">Kayıt bulunamadı.</p> : null}
          {!loading && items.length ? (
            <ul className="divide-y divide-black/5">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition hover:bg-[#fafafa] ${
                      selected?.id === item.id ? "bg-weecomi-orange/5" : ""
                    }`}
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="font-heading text-sm font-medium text-weecomi-dark-gray">{item.fullName}</span>
                      <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px]">{item.status}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.email}</span>
                    <span className="text-xs text-muted-foreground">{item.productInterest}</span>
                    <span className="text-[11px] text-muted-foreground">{formatDate(item.createdAt)}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="rounded-xl border border-black/10 bg-white p-5">
          {!selected ? (
            <p className="text-sm text-muted-foreground">Detay görmek için bir kayıt seçin.</p>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-xl text-weecomi-dark-gray">{selected.fullName}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{formatDate(selected.createdAt)}</p>
                </div>
                <select
                  value={selected.status}
                  onChange={(event) => changeStatus(selected.id, event.target.value)}
                  className="h-9 rounded-lg border border-black/10 px-2 text-sm"
                >
                  {statusOptions.filter((option) => option.value).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">E-posta</dt>
                  <dd>{selected.email}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Telefon</dt>
                  <dd>{selected.phone}</dd>
                </div>
                {selected.company ? (
                  <div>
                    <dt className="text-muted-foreground">Şirket</dt>
                    <dd>{selected.company}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-muted-foreground">Ürün</dt>
                  <dd>{selected.productInterest}</dd>
                </div>
              </dl>

              <div>
                <p className="text-sm text-muted-foreground">Mesaj</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-weecomi-dark-gray">{selected.message}</p>
              </div>

              <button
                type="button"
                onClick={() => onDelete(selected.id)}
                className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700 transition hover:bg-red-50"
              >
                Kaydı sil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

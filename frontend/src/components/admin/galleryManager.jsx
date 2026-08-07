"use client";

import { useEffect, useState } from "react";
import {
  createAdminGallery,
  deleteAdminGallery,
  listAdminGallery,
  updateAdminGallery,
} from "@/lib/api/gallery";
import { useToast } from "@/components/ui/toast";

const locales = ["tr", "en", "ru", "az", "ka"];
const emptyForm = {
  category: "other",
  status: "DRAFT",
  sortOrder: 0,
  titles: { tr: "", en: "", ru: "", az: "", ka: "" },
  descriptions: { tr: "", en: "", ru: "", az: "", ka: "" },
};

export default function GalleryManager() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [localeTab, setLocaleTab] = useState("tr");
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await listAdminGallery({ page: 1, pageSize: 50, search });
      setItems(data.items || []);
    } catch (err) {
      toast({ title: "Galeri yüklenemedi", description: err.response?.data?.error || "Hata", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      category: item.category,
      status: item.status,
      sortOrder: item.sortOrder,
      titles: item.titles,
      descriptions: item.descriptions,
    });
    setCoverImage(null);
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setCoverImage(null);
  }

  async function onSubmit(event) {
    event.preventDefault();
    const payload = new FormData();
    payload.append(
      "payload",
      JSON.stringify({
        category: form.category,
        status: form.status,
        sortOrder: Number(form.sortOrder) || 0,
        titles: form.titles,
        descriptions: form.descriptions,
      }),
    );
    if (coverImage) payload.append("coverImage", coverImage);

    try {
      if (editingId) {
        await updateAdminGallery(editingId, payload);
        toast({ title: "Galeri güncellendi" });
      } else {
        await createAdminGallery(payload);
        toast({ title: "Galeri öğesi oluşturuldu" });
      }
      resetForm();
      await load();
    } catch (err) {
      toast({ title: "Kayıt başarısız", description: err.response?.data?.error || "Hata", variant: "destructive" });
    }
  }

  async function onDelete(id) {
    if (!window.confirm("Bu öğeyi silmek istiyor musun?")) return;
    try {
      await deleteAdminGallery(id);
      toast({ title: "Silindi" });
      await load();
    } catch (err) {
      toast({ title: "Silinemedi", description: err.response?.data?.error || "Hata", variant: "destructive" });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Galeri Yönetimi</h1>
          <p className="text-sm text-slate-500">Kapak görselli galeri öğelerini yönet.</p>
        </div>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Ara..."
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
          <button type="button" onClick={load} className="rounded-xl bg-slate-800 px-3 py-2 text-sm font-semibold text-white">
            Filtrele
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap gap-2">
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => setLocaleTab(locale)}
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                localeTab === locale ? "bg-[#346C92] text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              {locale}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold">Başlık ({localeTab})</label>
            <input
              value={form.titles[localeTab]}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, titles: { ...prev.titles, [localeTab]: event.target.value } }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
              required={localeTab === "tr"}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Açıklama ({localeTab})</label>
            <textarea
              value={form.descriptions[localeTab]}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  descriptions: { ...prev.descriptions, [localeTab]: event.target.value },
                }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Kategori</label>
            <select
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            >
              {["events", "products", "office", "team", "other"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Durum</label>
            <select
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            >
              {["DRAFT", "PUBLISHED", "UNPUBLISHED"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Sıra</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(event) => setForm((prev) => ({ ...prev, sortOrder: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Kapak görseli</label>
            <input type="file" accept="image/*" onChange={(event) => setCoverImage(event.target.files?.[0] || null)} />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="submit" className="rounded-xl bg-[#346C92] px-4 py-2 text-sm font-semibold text-white">
            {editingId ? "Güncelle" : "Oluştur"}
          </button>
          {editingId ? (
            <button type="button" onClick={resetForm} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold">
              İptal
            </button>
          ) : null}
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {loading ? (
          <p className="p-5 text-sm text-slate-500">Yükleniyor...</p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Başlık</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Durum</th>
                <th className="px-4 py-3">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-700">{item.titles?.tr || item.titles?.en}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" className="font-semibold text-[#346C92]" onClick={() => startEdit(item)}>
                        Düzenle
                      </button>
                      <button type="button" className="font-semibold text-red-600" onClick={() => onDelete(item.id)}>
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  createAdminNews,
  deleteAdminNews,
  listAdminNews,
  updateAdminNews,
} from "@/lib/api/news";
import { useToast } from "@/components/ui/toast";
import { newsCategoryKeys, newsCategoryLabels } from "@/data/newsCategories";

const locales = ["tr", "en", "ru", "az", "ka"];
const emptyForm = {
  category: "announcement",
  status: "DRAFT",
  isFeatured: false,
  author: "",
  titles: { tr: "", en: "", ru: "", az: "", ka: "" },
  summaries: { tr: "", en: "", ru: "", az: "", ka: "" },
  highlights: { tr: "", en: "", ru: "", az: "", ka: "" },
  contents: { tr: "", en: "", ru: "", az: "", ka: "" },
};

export default function NewsManager() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const [removeAuthorImage, setRemoveAuthorImage] = useState(false);
  const [localeTab, setLocaleTab] = useState("tr");
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await listAdminNews({ page: 1, pageSize: 50, search });
      setItems(data.items || []);
    } catch (err) {
      toast({ title: "Haberler yüklenemedi", description: err.response?.data?.error || "Hata", variant: "destructive" });
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
      isFeatured: Boolean(item.isFeatured),
      author: item.author || "",
      titles: item.titles,
      summaries: item.summaries,
      highlights: item.highlights || { tr: "", en: "", ru: "", az: "", ka: "" },
      contents: item.contents,
    });
    setCoverImage(null);
    setAuthorImage(null);
    setRemoveAuthorImage(false);
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setCoverImage(null);
    setAuthorImage(null);
    setRemoveAuthorImage(false);
  }

  async function onSubmit(event) {
    event.preventDefault();
    const payload = new FormData();
    payload.append(
      "payload",
      JSON.stringify({
        category: form.category,
        status: form.status,
        isFeatured: form.isFeatured,
        author: form.author,
        titles: form.titles,
        summaries: form.summaries,
        highlights: form.highlights,
        contents: form.contents,
        removeAuthorImage,
      }),
    );
    if (coverImage) payload.append("coverImage", coverImage);
    if (authorImage) payload.append("authorImage", authorImage);

    try {
      if (editingId) {
        await updateAdminNews(editingId, payload);
        toast({ title: "Haber güncellendi" });
      } else {
        await createAdminNews(payload);
        toast({ title: "Haber oluşturuldu" });
      }
      resetForm();
      await load();
    } catch (err) {
      toast({ title: "Kayıt başarısız", description: err.response?.data?.error || "Hata", variant: "destructive" });
    }
  }

  async function onDelete(id) {
    if (!window.confirm("Bu haberi silmek istiyor musun?")) return;
    try {
      await deleteAdminNews(id);
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
          <h1 className="text-2xl font-bold text-slate-800">Haber Yönetimi</h1>
          <p className="text-sm text-slate-500">Kategori, öne çıkan, yazar ve highlight alanlarıyla haberleri yönet.</p>
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

        <div className="mt-4 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
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
              <label className="mb-1 block text-sm font-semibold">Özet ({localeTab})</label>
              <textarea
                value={form.summaries[localeTab]}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    summaries: { ...prev.summaries, [localeTab]: event.target.value },
                  }))
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
                rows={3}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Highlight / öne çıkan alıntı ({localeTab})</label>
            <textarea
              value={form.highlights[localeTab]}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  highlights: { ...prev.highlights, [localeTab]: event.target.value },
                }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
              rows={3}
              placeholder="Detay sayfasındaki mavi vurgu bloğu"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">İçerik ({localeTab})</label>
            <textarea
              value={form.contents[localeTab]}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, contents: { ...prev.contents, [localeTab]: event.target.value } }))
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
              rows={6}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-semibold">Kategori</label>
              <select
                value={form.category}
                onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              >
                {newsCategoryKeys.map((item) => (
                  <option key={item} value={item}>
                    {newsCategoryLabels[item]?.tr || item}
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
              <label className="mb-1 block text-sm font-semibold">Yazar</label>
              <input
                value={form.author}
                onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
                placeholder="WeeComi"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Kapak görseli</label>
              <input type="file" accept="image/*" onChange={(event) => setCoverImage(event.target.files?.[0] || null)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Yazar fotoğrafı</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setAuthorImage(event.target.files?.[0] || null);
                  setRemoveAuthorImage(false);
                }}
              />
              {editingId ? (
                <label className="mt-2 inline-flex items-center gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={removeAuthorImage}
                    onChange={(event) => setRemoveAuthorImage(event.target.checked)}
                    className="h-3.5 w-3.5 rounded border-slate-300"
                  />
                  Mevcut yazar fotoğrafını kaldır
                </label>
              ) : null}
            </div>
          </div>
          <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(event) => setForm((prev) => ({ ...prev, isFeatured: event.target.checked }))}
              className="h-4 w-4 rounded border-slate-300"
            />
            Öne çıkan haber (liste hero)
          </label>
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
                <th className="px-4 py-3">Öne çıkan</th>
                <th className="px-4 py-3">Durum</th>
                <th className="px-4 py-3">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold text-slate-700">{item.titles?.tr || item.titles?.en}</td>
                  <td className="px-4 py-3">{newsCategoryLabels[item.category]?.tr || item.category}</td>
                  <td className="px-4 py-3">{item.isFeatured ? "Evet" : "—"}</td>
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

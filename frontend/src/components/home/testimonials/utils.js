export const MIN_LOCALE_TESTIMONIALS = 6;
export const MAX_TESTIMONIALS = 12;

export function normalizeText(value) {
  return String(value || "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getDisplayName(item) {
  return normalizeText(`${item.name || ""} ${item.surname || ""}`) || "WeeComi";
}

export function getInitials(name) {
  const parts = normalizeText(name).split(" ").filter(Boolean);
  if (!parts.length) return "W";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

export function createExcerpt(value, maxLength = 340) {
  const normalized = normalizeText(value);
  if (normalized.length <= maxLength) return normalized;

  const sliced = normalized.slice(0, maxLength);
  const lastSentence = Math.max(sliced.lastIndexOf("."), sliced.lastIndexOf("!"), sliced.lastIndexOf("?"));
  const lastSpace = sliced.lastIndexOf(" ");
  const cutIndex = lastSentence > maxLength * 0.65 ? lastSentence + 1 : lastSpace;

  return `${sliced.slice(0, Math.max(cutIndex, maxLength * 0.7)).trim()}...`;
}

function getContactTypeLabel(type) {
  if (type === "instagram") return "Instagram";
  if (type === "phone") return "Phone";
  if (type === "facebook") return "Facebook";
  return null;
}

function getContactValue(type, value) {
  const normalized = normalizeText(value);
  if (!normalized || type === "no_contact") return null;
  if (type === "instagram" && !normalized.startsWith("@")) return `@${normalized}`;
  return normalized;
}

function formatJoinedDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function getApprovedTestimonials(source, locale) {
  const seen = new Set();
  const approved = source
    .filter((item) => item?.is_approved === 1 && item?.body)
    .map((item) => ({
      id: item.id,
      name: getDisplayName(item),
      image: item.image || null,
      body: normalizeText(item.body),
      excerpt: createExcerpt(item.body),
      language: item.language || "",
      joinedAt: formatJoinedDate(item.created_at),
      contactLabel: getContactTypeLabel(item.contact_type),
      contactValue: getContactValue(item.contact_type, item.contact),
    }))
    .filter((item) => {
      const duplicateKey = `${item.name.toLowerCase()}|${item.body.toLowerCase()}`;
      if (seen.has(duplicateKey)) return false;
      seen.add(duplicateKey);
      return true;
    });

  const localeItems = approved.filter((item) => item.language === locale);
  const merged =
    localeItems.length >= MIN_LOCALE_TESTIMONIALS
      ? localeItems
      : [...localeItems, ...approved.filter((item) => item.language !== locale)];

  return merged.slice(0, MAX_TESTIMONIALS);
}

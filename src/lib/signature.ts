export type SignatureFields = {
  name: string;
  title: string;
  phone: string;
};

export const defaultSignatureFields: SignatureFields = {
  name: "John Doe",
  title: "Sample Title",
  phone: "+36 30 123 4567",
};

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function formatPhoneDisplay(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  const hasPlus = trimmed.startsWith("+");
  let digits = trimmed.replace(/\D/g, "");

  if (trimmed.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("06")) {
    digits = `36${digits.slice(2)}`;
  } else if (digits.startsWith("36")) {
    digits = `36${digits.slice(2)}`;
  } else if (!hasPlus && digits.length === 9) {
    digits = `36${digits}`;
  }

  if (digits.startsWith("36")) {
    const national = digits.slice(2, 11);
    const area = national.slice(0, 2);
    const middle = national.slice(2, 5);
    const last = national.slice(5, 9);
    const parts = ["+36"];

    if (area) parts.push(area);
    if (middle) parts.push(middle);
    if (last) parts.push(last);

    return parts.join(" ").trim();
  }

  const prefix = hasPlus || trimmed.startsWith("00") ? "+" : "";
  const groups = digits.match(/.{1,3}/g) || [];
  return `${prefix}${groups.join(" ")}`.trim();
}

export function normalizePhoneHref(value: string) {
  const formatted = formatPhoneDisplay(value);
  if (!formatted) {
    return "";
  }

  const cleaned = formatted.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) {
    return cleaned;
  }

  return cleaned.replace(/\+/g, "");
}

export function buildSignatureHtml(template: string, fields: SignatureFields) {
  const safeName = escapeHtml(fields.name.trim() || "Your Name");
  const safeTitle = escapeHtml(fields.title.trim() || "Your Title");
  const safePhone = escapeHtml(formatPhoneDisplay(fields.phone) || "+36 30 123 4567");
  const phoneHref = normalizePhoneHref(fields.phone) || "+36301234567";

  return template
    .replaceAll("{{NAME}}", safeName)
    .replaceAll("{{TITLE}}", safeTitle)
    .replaceAll("{{PHONE}}", safePhone)
    .replaceAll("{{PHONE_HREF}}", phoneHref);
}
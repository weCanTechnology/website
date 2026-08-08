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

export type PreviewMode = "light" | "dark";

const DARK_MEDIA_QUERY = "@media (prefers-color-scheme: dark)";

/**
 * Splits the template's dark-mode media query into the text before it, the rules inside
 * it, and the text after it. Brace-matched rather than regexed, because the block
 * contains nested rule braces.
 */
function splitDarkModeBlock(html: string) {
  const start = html.indexOf(DARK_MEDIA_QUERY);
  if (start === -1) {
    return null;
  }

  const open = html.indexOf("{", start + DARK_MEDIA_QUERY.length);
  if (open === -1) {
    return null;
  }

  let depth = 0;
  for (let i = open; i < html.length; i += 1) {
    if (html[i] === "{") {
      depth += 1;
    } else if (html[i] === "}") {
      depth -= 1;
      if (depth === 0) {
        return {
          before: html.slice(0, start),
          rules: html.slice(open + 1, i),
          after: html.slice(i + 1),
        };
      }
    }
  }

  return null;
}

/**
 * Renders the signature for one specific colour mode, so both previews are visible at
 * once regardless of the viewer's OS setting.
 *
 * The dark preview applies the media query's rules unconditionally — they keep their
 * !important declarations, so they win over the inline styles exactly as they do in a
 * real dark-mode client. The light preview drops the block entirely.
 */
export function buildPreviewDocument(html: string, mode: PreviewMode) {
  const parts = splitDarkModeBlock(html);
  const document = parts
    ? mode === "dark"
      ? `${parts.before}${parts.rules}${parts.after}`
      : `${parts.before}${parts.after}`
    : html;

  const background = mode === "dark" ? "#1e1e1e" : "#ffffff";
  const backdrop = `<style>html,body{background:${background};}</style>`;

  return document.includes("</head>")
    ? document.replace("</head>", `${backdrop}</head>`)
    : `${backdrop}${document}`;
}

/**
 * Plain-text rendering of the signature.
 *
 * This is what goes on the clipboard's `text/plain` flavour. Some paste paths resolve to
 * that flavour instead of `text/html` — Ctrl+Shift+V, "Keep Text Only", plain-text
 * compose windows — and they must land a readable signature, never raw markup.
 */
export function buildPlainTextSignature(fields: SignatureFields) {
  return [
    fields.name.trim() || "Your Name",
    fields.title.trim() || "Your Title",
    formatPhoneDisplay(fields.phone) || "+36 30 123 4567",
    "wecan.technology",
  ].join("\n");
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
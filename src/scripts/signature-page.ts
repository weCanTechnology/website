import signatureTemplate from "../data/signature-template.html?raw";
import {
  buildPlainTextSignature,
  buildPreviewDocument,
  buildSignatureHtml,
  formatPhoneDisplay,
} from "../lib/signature";

export function setupSignaturePage() {
  const nameInput = document.getElementById("sig-name") as HTMLInputElement | null;
  const titleInput = document.getElementById("sig-title") as HTMLInputElement | null;
  const phoneInput = document.getElementById("sig-phone") as HTMLInputElement | null;
  const previewLight = document.getElementById("signature-preview-light") as HTMLIFrameElement | null;
  const previewDark = document.getElementById("signature-preview-dark") as HTMLIFrameElement | null;
  const htmlOutput = document.getElementById("signature-html") as HTMLTextAreaElement | null;
  const status = document.getElementById("copy-status") as HTMLDivElement | null;
  const copyHtmlButton = document.getElementById("copy-html") as HTMLButtonElement | null;
  const copyRichButton = document.getElementById("copy-rich") as HTMLButtonElement | null;

  if (
    !nameInput ||
    !titleInput ||
    !phoneInput ||
    !previewLight ||
    !previewDark ||
    !htmlOutput ||
    !status ||
    !copyHtmlButton ||
    !copyRichButton
  ) {
    return;
  }

  let plainText = "";

  const setStatus = (message: string, isError = false) => {
    status.textContent = message;
    status.style.color = isError ? "#b74343" : "#157659";
  };

  const updateSignature = () => {
    const formattedPhone = formatPhoneDisplay(phoneInput.value);
    if (phoneInput.value !== formattedPhone && formattedPhone) {
      phoneInput.value = formattedPhone;
    }

    const fields = {
      name: nameInput.value,
      title: titleInput.value,
      phone: formattedPhone || phoneInput.value,
    };

    const html = buildSignatureHtml(signatureTemplate, fields);

    previewLight.srcdoc = buildPreviewDocument(html, "light");
    previewDark.srcdoc = buildPreviewDocument(html, "dark");
    htmlOutput.value = html;
    plainText = buildPlainTextSignature(fields);
  };

  const applyQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const title = params.get("title");
    const phone = params.get("phone");

    if (name !== null) {
      nameInput.value = name;
    }

    if (title !== null) {
      titleInput.value = title;
    }

    if (phone !== null) {
      phoneInput.value = formatPhoneDisplay(phone);
    }
  };

  [nameInput, titleInput].forEach((input) => {
    input.addEventListener("input", updateSignature);
  });

  phoneInput.addEventListener("input", updateSignature);
  phoneInput.addEventListener("blur", () => {
    phoneInput.value = formatPhoneDisplay(phoneInput.value);
    updateSignature();
  });

  copyHtmlButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(htmlOutput.value);
      setStatus("Source HTML copied.");
    } catch {
      setStatus("Could not copy source HTML.", true);
    }
  });

  copyRichButton.addEventListener("click", async () => {
    const html = htmlOutput.value;
    try {
      if (window.ClipboardItem && navigator.clipboard?.write) {
        const item = new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          // Never put markup on the plain-text flavour. Paste paths that resolve to it
          // (Ctrl+Shift+V, "Keep Text Only", plain-text compose) would otherwise dump
          // raw HTML into the message instead of a signature.
          "text/plain": new Blob([plainText], { type: "text/plain" }),
        });
        await navigator.clipboard.write([item]);
        setStatus("Signature copied. Paste into Outlook with Ctrl+V (⌘V on Mac).");
        return;
      }

      await navigator.clipboard.writeText(html);
      setStatus("Rich copy unsupported here, source HTML copied instead.");
    } catch {
      setStatus("Could not copy the signature.", true);
    }
  });

  applyQueryParams();
  updateSignature();
}
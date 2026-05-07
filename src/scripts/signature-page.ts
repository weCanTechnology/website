import signatureTemplate from "../data/signature-template.html?raw";
import { buildSignatureHtml, formatPhoneDisplay } from "../lib/signature";

export function setupSignaturePage() {
  const nameInput = document.getElementById("sig-name") as HTMLInputElement | null;
  const titleInput = document.getElementById("sig-title") as HTMLInputElement | null;
  const phoneInput = document.getElementById("sig-phone") as HTMLInputElement | null;
  const preview = document.getElementById("signature-preview") as HTMLIFrameElement | null;
  const htmlOutput = document.getElementById("signature-html") as HTMLTextAreaElement | null;
  const status = document.getElementById("copy-status") as HTMLDivElement | null;
  const copyHtmlButton = document.getElementById("copy-html") as HTMLButtonElement | null;
  const copyRichButton = document.getElementById("copy-rich") as HTMLButtonElement | null;

  if (!nameInput || !titleInput || !phoneInput || !preview || !htmlOutput || !status || !copyHtmlButton || !copyRichButton) {
    return;
  }

  const setStatus = (message: string, isError = false) => {
    status.textContent = message;
    status.style.color = isError ? "#b74343" : "#157659";
  };

  const updateSignature = () => {
    const formattedPhone = formatPhoneDisplay(phoneInput.value);
    if (phoneInput.value !== formattedPhone && formattedPhone) {
      phoneInput.value = formattedPhone;
    }

    const html = buildSignatureHtml(signatureTemplate, {
      name: nameInput.value,
      title: titleInput.value,
      phone: formattedPhone || phoneInput.value,
    });

    preview.srcdoc = html;
    htmlOutput.value = html;
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
          "text/plain": new Blob([html], { type: "text/plain" }),
        });
        await navigator.clipboard.write([item]);
        setStatus("Rendered signature copied.");
        return;
      }

      await navigator.clipboard.writeText(html);
      setStatus("Rich copy unsupported here, source HTML copied instead.");
    } catch {
      setStatus("Could not copy rendered signature.", true);
    }
  });

  applyQueryParams();
  updateSignature();
}
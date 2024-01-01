import { DirectiveBinding } from "vue";

const ClipboardDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const copyText = async () => {
      try {
        const textContent = el.textContent;
        if (!textContent) throw new Error("No text content available");

        await navigator.clipboard.writeText(textContent);

        if (binding.arg === "success" && typeof binding.value === "function") {
          binding.value();
          return;
        }
        console.log("Text copied to clipboard");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    el.addEventListener("click", copyText);
  },
  unmounted() {
    navigator.clipboard.writeText("");
  },
};

export default ClipboardDirective;

export default {
  ref(ele: Element, ref: { value: any }) {
    if (typeof ref == "object") {
      ref.value = ele;
    } else {
      throw TypeError("invalid ref");
    }
  },
  html(ele: Element, html: string) {
    if (typeof html == "string") {
      ele.innerHTML = html;
    } else {
      throw TypeError("invalid html");
    }
  },
  text(ele: Element, text: string) {
    if (typeof text == "string") {
      ele.textContent = text;
    } else {
      throw TypeError("invalid text");
    }
  }
};

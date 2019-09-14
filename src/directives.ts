export default {
  ref(ele: Element, ref: { value: any }) {
    if (typeof ref == "object") {
      ref.value = ele;
    } else {
      throw TypeError("invalid ref");
    }
  },
  html(ele: Element, html: string) {
    // ele.innerHTML = html;
    // console.log(ele.outerHTML);
    if (typeof html == "string") {
      requestAnimationFrame(() => {
        ele.innerHTML = html;
        //   console.log(ele.outerHTML);
      });
    } else {
      throw TypeError("invalid html");
    }
  },
  text(ele: Element, text: string) {
    // ele.textContent = text;
    // console.log(ele.outerHTML);
    if (typeof text == "string") {
      requestAnimationFrame(() => {
        ele.textContent = text;
        //   console.log(ele.outerHTML);
      });
    } else {
      throw TypeError("invalid text");
    }
  }
};

export default {
  ref(ele: Element, ref: { value: any }, vdom) {
    if (typeof ref == "object") {
      ref.value = ele;
    } else {
      throw TypeError("invalid ref");
    }
  },
  html(ele: Element, html: string, vdom) {
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
  text(ele: Element, text: string, vdom) {
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

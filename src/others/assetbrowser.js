import { isfunction, isobject } from "../UtilTools/util";
const { HTMLElement, customElements, Proxy } = window;
if (
    !isfunction(HTMLElement) ||
    !isfunction(Proxy) ||
    !isobject(customElements)
) {
    console.error("Proxy,HTMLElement ,customElements ,browser not supported !");
    throw new TypeError();
}
//# sourceMappingURL=assetbrowser.js.map

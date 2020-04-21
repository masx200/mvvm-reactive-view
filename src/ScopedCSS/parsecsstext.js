import { render } from "../RenderVirtual/render-vdom-to-real";
import createElement from "../CreateElement/create-element";
import { createanotherhtmldocument, appendchild } from "../UtilTools/dom";
import { get } from "../UtilTools/reflect";
export function parsecsstext(text) {
    const styleelement = render(createElement("style", [text]));
    const otherdocument = createanotherhtmldocument();
    appendchild(otherdocument.documentElement, styleelement);
    return Array.from(get(get(styleelement, "sheet"), "cssRules"));
}
//# sourceMappingURL=parsecsstext.js.map

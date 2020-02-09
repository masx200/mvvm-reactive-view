import { render } from "../RenderVirtual/render-vdom-to-real";
import createElement from "../CreateElement/create-element";
import { createanotherhtmldocument, appendchild } from "../UtilTools/dom";
import { get } from "../UtilTools/reflect";

export function parsecsstext(text: string): Array<CSSRule> {
    const styleelement = render(
        createElement("style", [text])
    ) as HTMLStyleElement;

    /* 只有添加到document之后才会有sheet */

    const otherdocument = createanotherhtmldocument();
    appendchild(otherdocument.documentElement, styleelement);

    return Array.from(
        get(
            get(styleelement, "sheet"),

            "cssRules"
        )
    );
}

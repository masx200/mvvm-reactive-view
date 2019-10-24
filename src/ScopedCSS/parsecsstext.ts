import { render } from "src/RenderVirtual/render-vdom-to-real";
import createElement from "src/CreateElement/create-element";
import { createanotherhtmldocument, appendchild } from "src/UtilTools/dom";
import { get } from "src/UtilTools/reflect";

export function parsecsstext(text: string): Array<CSSRule> {
  const styleelement = render(
    createElement("style", [text])
  ) as HTMLStyleElement;
  //   console.dir(styleelement);
  /* 只有添加到document之后才会有sheet */
  //const otherdocument = document.implementation.createHTMLDocument("");
  const otherdocument = createanotherhtmldocument();
  appendchild(otherdocument.documentElement, styleelement);
  //otherdocument.firstElementChild.appendChild(styleelement);
  return Array.from(
    get(
      get(styleelement, "sheet"),

      "cssRules"
    )
  );
}

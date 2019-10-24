import createElement from "../CreateElement/create-element";
import render from "../RenderVirtual/render-vdom-to-real";

const componentsstylesheet: Map<string, Set<string>> = new Map();
// { [key: string]: Set<string> }

export { componentsstylesheet };

export function createlinkstylesheet(url: string): HTMLLinkElement {
  return render(
    createElement("link", { href: url, rel: "stylesheet" })
  ) as HTMLLinkElement;
}

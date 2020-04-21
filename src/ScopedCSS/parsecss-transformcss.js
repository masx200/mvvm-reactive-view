import createElement from "../CreateElement/create-element";
import render from "../RenderVirtual/render-vdom-to-real";
const componentsstylesheet = new Map();
export { componentsstylesheet };
export function createlinkstylesheet(url) {
    return render(createElement("link", { href: url, rel: "stylesheet" }));
}
//# sourceMappingURL=parsecss-transformcss.js.map

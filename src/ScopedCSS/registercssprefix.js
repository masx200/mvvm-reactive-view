import { transformcsstext } from "./transformcsstext";
import { savestyleblob } from "./savestyleblob";
export function registercssprefix(text, prefix) {
    const css = text;
    const cssnewtext = transformcsstext(css, prefix);
    savestyleblob(prefix, cssnewtext);
}
//# sourceMappingURL=registercssprefix.js.map

import { transformcsstext } from "./transformcsstext";
import { savestyleblob } from "./savestyleblob";

export function registercssprefix(text: string, prefix: string) {
    const css = text;
    const cssnewtext = transformcsstext(css, prefix);

    savestyleblob(prefix, cssnewtext);
}

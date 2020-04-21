import { componentsstylesheet } from "./parsecss-transformcss";
import { get, set } from "../UtilTools/reflect";
import { createcssBlob } from "./create-cssurlblob";
export function savestyleblob(tagname, csstext, urltext) {
    tagname = tagname.toLowerCase();
    const prefix = tagname;
    if (!get(componentsstylesheet, prefix)) {
        set(componentsstylesheet, tagname, new Set());
    }
    if (csstext) {
        get(componentsstylesheet, prefix).add(createcssBlob(csstext));
    } else if (urltext) {
        get(componentsstylesheet, prefix).add(urltext);
    }
}
//# sourceMappingURL=savestyleblob.js.map

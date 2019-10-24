import { componentsstylesheet } from "./parsecss-transformcss";
import { get, set } from "src/UtilTools/reflect";
import { createcssBlob } from "./create-cssurlblob";

export function savestyleblob(
  tagname: string,
  csstext?: string,
  urltext?: string
) {
  tagname = tagname.toLowerCase();
  const prefix = tagname;
  if (
    !get(componentsstylesheet, prefix)
    // componentsstylesheet[tagname]
  ) {
    set(componentsstylesheet, tagname, new Set());
    // componentsstylesheet[tagname] = ;
  }
  if (csstext) {
    get(componentsstylesheet, prefix).add(createcssBlob(csstext));
  } else if (urltext) {
    get(componentsstylesheet, prefix).add(urltext);
  }
}

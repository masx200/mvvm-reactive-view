import {
  componentsstylesheet,
  createlinkstylesheet,
  loadlinkstyle
} from "./parsecss-transformcss";
import { querySelectorAll } from "src/UtilTools/dom";
import { get } from "src/UtilTools/reflect";

export function waitloadallstyle(
  prefix: string,
  containerthis: Element | HTMLElement | SVGSVGElement | SVGElement
) {
  return Promise.all(
    [...get(componentsstylesheet, prefix)].map(styleurl => {
      if (
        querySelectorAll(`link[rel="stylesheet"][href="${styleurl}"]`).length
      ) {
        return Promise.resolve();
      } else {
        /* 如果已经有过相同的linkstylesheet挂载着的话,则不重复挂载 */
        return loadlinkstyle(createlinkstylesheet(styleurl), containerthis);
      }
    })
  );
}

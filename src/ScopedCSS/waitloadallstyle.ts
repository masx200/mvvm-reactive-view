import {
    componentsstylesheet,
    createlinkstylesheet
} from "./parsecss-transformcss";
import { querySelectorAll } from "../UtilTools/dom";
import { get } from "../UtilTools/reflect";
import { loadlinkstyle } from "./loadlinkstyle";

export function waitloadallstyle(
    prefix: string,
    containerthis: Element | HTMLElement | SVGSVGElement | SVGElement
) {
    return Promise.all(
        [...get(componentsstylesheet, prefix)].map((styleurl) => {
            if (
                querySelectorAll(`link[rel="stylesheet"][href="${styleurl}"]`)
                    .length
            ) {
                return Promise.resolve();
            } else {
                return loadlinkstyle(
                    createlinkstylesheet(styleurl),
                    containerthis
                );
            }
        })
    );
}

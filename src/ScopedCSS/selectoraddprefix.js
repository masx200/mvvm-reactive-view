export function selectoraddprefix(cssstylerule, prefix) {
    const selectorold = cssstylerule.selectorText;
    const stylebodyold = cssstylerule.cssText.slice(selectorold.length);
    const selectorTextss = selectorold;
    const selectorarray = selectorTextss.split(",");
    const selectoraftertransform = selectorarray
        .map((selectorTextone) => {
            let prefixselector = prefix + " " + selectorTextone;
            if (selectorTextone.startsWith("*")) {
                prefixselector =
                    prefixselector + "," + selectorTextone.replace("*", prefix);
            }
            return prefixselector;
        })
        .join(",");
    return {
        selectorText: selectoraftertransform,
        cssText: selectoraftertransform + stylebodyold,
        [Symbol.toStringTag]: "CSSStyleRule"
    };
}
//# sourceMappingURL=selectoraddprefix.js.map

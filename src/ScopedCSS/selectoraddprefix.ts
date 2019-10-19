import { get } from "src/UtilTools/reflect";

export function selectoraddprefix(cssstylerule: CSSStyleRule, prefix: string) {
  /* 突然发现Edge浏览器的 CSSStyleRule的selectorText属性居然是只读的?*/
  //css 选择器可能有多个
  //h1,p,h3,div
  const selectorold = cssstylerule.selectorText;
  const stylebodyold = cssstylerule.cssText.slice(selectorold.length);
  const selectorTextss = selectorold;

  const selectorarray = selectorTextss.split(",");
  const selectoraftertransform = selectorarray
    .map(selectorTextone => {
      let prefixselector = prefix + " " + selectorTextone;

      if (selectorTextone.startsWith("*")) {
        prefixselector =
          prefixselector + "," + selectorTextone.replace("*", prefix);
      }
      return prefixselector;
    })
    .join(",");

  /*   cssstylerule.selectorText = selectoraftertransform;
    if (cssstylerule.selectorText.startsWith(prefix)) {
      return cssstylerule;
    } else { */
  // console.trace();
  return {
    type: cssstylerule.type,
    parentRule: cssstylerule.parentRule,
    parentStyleSheet: cssstylerule.parentStyleSheet,
    style: cssstylerule.style,
    styleMap: get(cssstylerule, "styleMap"),
    selectorText: selectoraftertransform,
    cssText: selectoraftertransform + stylebodyold,
    // cssText: selectoraftertransform + stylebodyold,
    // selectorText: selectoraftertransform,
    [Symbol.toStringTag]: "CSSStyleRule"
  };
  // }

  /*
    const prefixselector = prefix + " " + selectorText;
    if (selectorText.startsWith("*")) {
      cssstylerule.selectorText =
        selectorText.replace("*", prefix) + "," + prefixselector;
      /* 对于'* '的处理,变成两个selectorrule*/

  /* 
      *{font-size:80px !important;}
  p{color:blue !important;} 
  */
  /* 
      
      q-9, q-9 * { font-size: 80px !important; }
  q-9 p { color: blue !important; }
  
      */
  /* } else {
      cssstylerule.selectorText = prefixselector;
    }
  */
}

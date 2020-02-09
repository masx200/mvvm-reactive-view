/*  selectoraddprefix函数返回新对象,不是修改原来的对象*/
export function selectoraddprefix(cssstylerule: CSSStyleRule, prefix: string) {
    /* 突然发现Edge浏览器的 CSSStyleRule的selectorText属性居然是只读的?*/

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

    return {
        /* 没有用到的变量,消耗性能 */

        selectorText: selectoraftertransform,
        cssText: selectoraftertransform + stylebodyold,

        [Symbol.toStringTag]: "CSSStyleRule"
    };

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

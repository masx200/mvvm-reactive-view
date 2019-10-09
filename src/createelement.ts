import { Class } from "./customclass";
import ReactiveState from "./reactivestate";
import { apply } from "./reflect";
import { isarray, isfunction, isplainobject, isstring } from "./util";
import Virtualdom, { Vdomchildren ,createVirtualElement} from "./virtualdom";
type styleprop =
  | string
  | object
  | ReactiveState<string>
  | ReactiveState<object>;

type classprop =
  | string
  | Set<string>
  | Array<string>
  | ReactiveState<string | Set<string> | Array<string>>;
export interface ElementAttrs {
  style?: styleprop;
  class?: classprop;
  [key: string]: any;
}

export default function<T extends Function | string>(
  type: T,
  propsorchildren?: Vdomchildren,
  ...children: Vdomchildren
): Virtualdom<T>;
export default function<T extends Vdomchildren>(
  type: "",
  propsorchildren?: T,
  ...children: T
): T;
export default function<T extends Vdomchildren>(
  type: "",
  props?: ElementAttrs,
  ...children: T
): T;
export default function<T extends Function | string>(
  type: T,
  props?: ElementAttrs,
  ...children: Vdomchildren
): Virtualdom<T>;
//如果第二个参数是数组，则 变成
/* 
h(type,...children)
h(type,children)
*/

export default function(
  type?: Function | string | ""|Class,
  propsorchildren?: Vdomchildren | ElementAttrs,
  ...children: Vdomchildren
) {
  if (isarray(propsorchildren)) {
    return apply(createElement, undefined, [
      type,
      undefined,
      [...propsorchildren, ...children].flat(1 / 0)
    ]);
    /*   createElement(
      type,
      undefined,
      [...propsorchildren, ...children].flat(1 / 0)
    ); */
  } else {
    return apply(createElement, undefined, Array.from(arguments)); // createElement(...arguments);
  }
}
function createElement<T extends Vdomchildren>(
  type: "",
  props?: ElementAttrs,
  ...children: T
): T;
function createElement<T extends Function | string>(
  type: T,
  props?: ElementAttrs,
  ...children: Vdomchildren
): Virtualdom<T>;

/* function createElement<T extends Vdomchildren>(
  type: "",
  props?: ElementAttrs,
  ...children: T
): T; */

function createElement<T extends Function | string|Class>(
  type: T="",
  props: ElementAttrs = {},
  ...children: Vdomchildren
): Virtualdom<T> | Vdomchildren {
  // | Array<Virtualdom | string>
  // if(isarray()){}
  /* add fragment element */
  //   console.log(type, props, children);
  let typenormalized = isstring(type) || isfunction(type) ? type : "";
  const propsnormalized = isplainobject(props) ? props : {};
  const childrennormalized = children
    .flat(Infinity)
    .map(a => (a === 0 ? "0" : a))
    .filter(a => !!a);
  if (
    isstring(typenormalized)
    //   typeof typenormalized === "string"
  ) {
    typenormalized = typenormalized.trim().toLowerCase();
  }

  if (
    //typeof typenormalized === "string" &&

    "" === typenormalized
  ) {
    return childrennormalized;
  } else {
    /* propsnormalized = Object.fromEntries(
    Object.entries(propsnormalized).map(([key, value]) => [
      key.trim().toLowerCase(),
      value
    ])
  ); */

   /* return new Virtualdom(
      typenormalized,
      propsnormalized,
      childrennormalized
    ) as Virtualdom<any>;
*/
return createVirtualElement(typenormalized,
      propsnormalized,
      childrennormalized
    )
  }
}

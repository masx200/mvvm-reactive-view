import { get, has } from "./reflect";
import { isobject } from "./util";
import { ElementAttrs } from "./createelement";
import { Class } from "./customclass";
// import { Class } from "./rendervdomtoreal";
import { merge_entries } from "./merge-entries";
import ReactiveState, { isReactiveState } from "./reactivestate";
/*export function isVirtualdom(a: any): a is Virtualdom<any> {
  return a instanceof Virtualdom;
}*/
export function isVirtualdom(a: any): a is Virtualdom<any> {
  return (
    isobject(a) &&
    has(a, isvirtualelement) &&
    get(a, isvirtualelement) === isvirtualelement
  );
}
export const isvirtualelement = Symbol("isvirtualelement");
export type Vdomchildren = Array<
  Virtualdom<any> | string | ReactiveState<any> | number
>;
export { createVirtualElement };
function createVirtualElement<T extends Class | string | Function>(
  type: T,
  props: ElementAttrs = {},
  children: Vdomchildren = []
): Virtualdom<T> {
  props = { ...props };
  children = children.flat(1 / 0);
  const 字母大小写 = /[A-Za-z\u4e00-\u9fa5]/;
  const propsentries = Object.entries(props);
  const propsentriesNOTevents = propsentries.filter(
    ([key]) => !(key.startsWith("@") || key.startsWith("on"))
  );
  const 字母开头的entries = propsentriesNOTevents.filter(([key]) =>
    字母大小写.test(key[0])
  );
  const thisarg = Object.create(null);
  Object.assign(thisarg, {
    type,
    bindattr: Object.fromEntries(
      字母开头的entries.filter(e => isReactiveState(e[1]))
    ),
    props: Object.fromEntries(
      字母开头的entries.filter(e => !isReactiveState(e[1]))
    ),
    children,
    onevent: Object.fromEntries(
      merge_entries([
        ...propsentries
          .filter(([key]) => /\@/.test(key[0]))
          .map(([key, value]) => [
            key
              .slice(1)
              .toLowerCase()
              .trim(),
            [value].flat(1 / 0)
          ]),
        ...propsentries
          .filter(([key]) => key.startsWith("on"))
          .map(([key, value]) => [
            key
              .slice(2)
              .toLowerCase()
              .trim(),
            [value].flat(1 / 0)
          ])
      ])
    ),
    directives: Object.fromEntries(
      propsentriesNOTevents
        .filter(
          ([key]) => new RegExp("*").test(key[0]) || key[0].startsWith("_")
        )
        .map(([key, value]) => [
          key
            .slice(1)
            .toLowerCase()
            .trim(),
          value
        ])
    )
  });
  thisarg[Symbol.toStringTag] = "VirtualElement";
  thisarg[isvirtualelement] = isvirtualelement;
  return thisarg;
}
interface Virtualdom<T extends Class | string | Function> {
  [isvirtualelement]: symbol;
  [Symbol.toStringTag]: string;
  element: undefined | Element | Node;
  type: T;
  props: ElementAttrs;
  children: Vdomchildren;
  directives: { [key: string]: any };
  onevent: {
    [key: string]: Array<EventListener>;
  };
  bindattr: {
    [key: string]: ReactiveState<any>;
  };
}
export default Virtualdom;
/*export default class Virtualdom<T extends Class | string | Function> {
  [Symbol.toStringTag] = "VirtualElement";
  /* get [Symbol.toStringTag]() {
    return "VirtualElement";
  } */
//   options: any |undefined
/*  element: undefined | Element | Node;
  type: T | undefined;
  props: ElementAttrs = {};
  children: Vdomchildren = [];
  directives: object = {};
  onevent: { [key: string]: Array<EventListener> } = {};
  bindattr: { [key: string]: ReactiveState<any> } = {};
  constructor(type: T, props: ElementAttrs = {}, children: Vdomchildren = []) {
    //对象浅拷贝
    props = { ...props };
    const 字母大小写 = /[A-Za-z\u4e00-\u9fa5]/;
    // console.log(type, props, children);
    //添加支持on开头事件绑定写法
    const propsentries = Object.entries(props);
    /*
.map(([key, value]) => [
key.startsWith("on")?key.replace("on","@")：key
,
value

]);
*/
/*   const propsentriesNOTevents = propsentries.filter(
      ([key]) => !(key.startsWith("@") || key.startsWith("on"))
    );
    const 字母开头的entries = propsentriesNOTevents.filter(([key]) =>
      字母大小写.test(key[0])
    );

    Object.assign(this, {
      type,
      bindattr: Object.fromEntries(
        /*   propsentriesNOTevents
          .filter(([key]) => 字母大小写.test(key[0])) */
/*    字母开头的entries.filter(
          e => isReactiveState(e[1])
          // e[1] instanceof ReactiveState
        )
      ),
      props: Object.fromEntries(
        /*   propsentriesNOTevents
          .filter(([key]) => 字母大小写.test(key[0])) */
/*  字母开头的entries.filter(
          e => !isReactiveState(e[1])
          //    e[1] instanceof ReactiveState
        )
      ),
      children: children.flat(1 / 0),
      onevent: Object.fromEntries(
        /* 需要合并entries
        [
        ['value',[f,f]]
        ,
        ['value',[f,f]]
      ]
        合并成

         [
        ['value',[f,f,f,f]]
         ]
        */

/* 
        
        [["value",["f","f"]],["value",["f","f"]]]


        [["value",["f","f","f","f"]]]
        
        */
/*     merge_entries([
          ...propsentries
            .filter(([key]) => /\@/.test(key[0]))
            .map(([key, value]) => [
              //事件名称变成小写
              key
                .slice(1)
                .toLowerCase()
                .trim(),
              //把事件绑定变成事件数组
              [value].flat(1 / 0)
            ]),
          ...propsentries
            .filter(([key]) => key.startsWith("on"))
            .map(([key, value]) => [
              //事件名称变成小写
              key
                .slice(2)
                .toLowerCase()
                .trim(),
              //把事件绑定变成事件数组
              [value].flat(1 / 0)
            ])
        ])
      ),

      //指令支持以"*"开头和"_"开头
      directives: Object.fromEntries(
        propsentriesNOTevents
        /*  .filter(([key]) => /\*/
/*.test(key[0]) || key[0].startsWith("_"))
        /*  .map(([key, value]) => [
            //指令也变成小写
            key
              .slice(1)
              .toLowerCase()
              .trim(),

            value
          ])
      )
    });
    /* 
 Object.defineProperty(this, Symbol.toStringTag, {
      value: "virtualdom",
      configurable: true
    });
*/
/*  }
}*/
/* defineProperty(Virtualdom.prototype, Symbol.toStringTag, {
  value: "VirtualElement"
});
 */

export function isVirtualdom(a: any): a is Virtualdom {
  return a instanceof Virtualdom;
}
import ReactiveState, { isReactiveState } from "./reactivestate";
// import { Class } from "./rendervdomtoreal";
import { merge_entries } from "./merge-entries";
import { Class } from "./customclass";

export default class Virtualdom {
  /* get [Symbol.toStringTag]() {
    return "VirtualElement";
  } */
  //   options: any |undefined
  element: undefined | Element | Node;
  type: string | Function | Class = "";
  props: { [key: string]: string | object } = {};
  children: Array<Virtualdom | string | ReactiveState | number> = [];
  directives: object = {};
  onevent: { [key: string]: Array<EventListener> } = {};
  bindattr: { [key: string]: ReactiveState } = {};
  constructor(
    type: Function | string = "",
    props: object = {},
    children: Array<Virtualdom | string | ReactiveState | number> = []
  ) {
    const 字母大小写 = /[A-Za-z]/;
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
    const propsentriesNOTevents = propsentries.filter(
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
        字母开头的entries.filter(
          e => isReactiveState(e[1])
          // e[1] instanceof ReactiveState
        )
      ),
      props: Object.fromEntries(
        /*   propsentriesNOTevents
          .filter(([key]) => 字母大小写.test(key[0])) */
        字母开头的entries.filter(
          e => !isReactiveState(e[1])
          //    e[1] instanceof ReactiveState
        )
      ),
      children: children.flat(),
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
        merge_entries([
          ...propsentries
            .filter(([key]) => /\@/.test(key[0]))
            .map(([key, value]) => [
              //事件名称变成小写
              key
                .slice(1)
                .toLowerCase()
                .trim(),
              //把事件绑定变成事件数组
              [value].flat()
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
              [value].flat()
            ])
        ])
      ),

      //指令支持以"*"开头和"_"开头
      directives: Object.fromEntries(
        propsentriesNOTevents
          .filter(([key]) => /\*/.test(key[0]) || key[0].startsWith("_"))
          .map(([key, value]) => [
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
  }
}
Reflect.defineProperty(Virtualdom.prototype, Symbol.toStringTag, {
  value: "VirtualElement"
});

import {ElementAttrs}from"./createelement"
export function isVirtualdom(a: any): a is Virtualdom {
  return a instanceof Virtualdom;
}
import ReactiveState, { isReactiveState } from "./reactivestate";
// import { Class } from "./rendervdomtoreal";
import { merge_entries } from "./merge-entries";
import { Class } from "./customclass";

export default class Virtualdom <T extends Class|string|Function,K extends Array<Virtualdom | string | ReactiveState | number>
   >
{
  /* get [Symbol.toStringTag]() {
    return "VirtualElement";
  } */
  //   options: any |undefined
  element: undefined | Element | Node;
  type: T = "";
  props: ElementAttrs = {};
  children: K = [];
  directives: object = {};
  onevent: { [key: string]: Array<EventListener> } = {};
  bindattr: { [key: string]: ReactiveState<any> } = {};
  constructor(
    type: T= "",
    props: ElementAttrs = {},
    children: K = []
  ) {
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

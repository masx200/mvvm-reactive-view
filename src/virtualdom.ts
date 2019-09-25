export function isVirtualdom(a: any): a is Virtualdom {
  return a instanceof Virtualdom;
}
import ReactiveState, { isReactiveState } from "./primitivestate";
import { Class } from "./rendervdomtoreal";

export default class Virtualdom {
  //   options: any |undefined
  element: undefined | Element | Node;
  type: string | Function | Class = "";
  props: { [key: string]: string | object } = {};
  children: Array<Virtualdom | string | ReactiveState> = [];
  directives: object = {};
  onevent: { [key: string]: Array<EventListener> } = {};
  bindattr: { [key: string]: ReactiveState } = {};
  constructor(
    type: Function | string = "",
    props: object = {},
    children: Array<Virtualdom | string | ReactiveState> = []
  ) {
    const 字母大小写 = /[A-Za-z]/;
    // console.log(type, props, children);
//添加支持on开头事件绑定写法
    const propsentries = Object.entries(props)
/*
.map(([key, value]) => [
key.startsWith("on")?key.replace("on","@")：key
,
value

]);
*/
const propsentriesNOTevents =propsentries.filter(([key]) => 
!(
key.startsWith("@")||key.startsWith("on")

)
)
    Object.assign(this, {
      type,
      bindattr: Object.fromEntries(
        propsentriesNOTevents
          .filter(([key]) => 字母大小写.test(key[0]))
          .filter(
            e => isReactiveState(e[1])
            // e[1] instanceof ReactiveState
          )
      ),
      props: Object.fromEntries(
        propsentriesNOTevents
          .filter(([key]) => 字母大小写.test(key[0]))
          .filter(
            e => !isReactiveState(e[1])
            //    e[1] instanceof ReactiveState
          )
      ),
      children: children.flat(),
      onevent: Object.fromEntries(
        [...propsentries
          .filter(([key]) => /\@/.test(key[0]))
          .map(([key, value]) => [
//事件名称变成小写
            key.slice(1).toLowerCase().trim(),
            //把事件绑定变成事件数组
            [value].flat()
          ])
     ] ),
      directives: Object.fromEntries(
        propsentriesNOTevents
          .filter(([key]) => /\*/.test(key[0]))
          .map(([key, value]) => [

//指令也变成小写
key.slice(1).toLowerCase().trim()

, value])
      )
    });
    Object.defineProperty(this, Symbol.toStringTag, {
      value: "virtualdom",
      configurable: true
    });
  }
}

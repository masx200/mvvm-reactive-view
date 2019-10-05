type styleprop = string | object|ReactiveState<string>|ReactiveState<object>;

type classprop = string | Set<string> | Array<string>|ReactiveState<string | Set<string> | Array<string>>;
export interface ElementAttrs{
style?:styleprop,
class?:classprop,
[key:string]:any
}
import ReactiveState from './reactivestate';
import {isarray, isstring, isobject,isplainobject, isfunction } from "./util";
import Virtualdom from "./virtualdom";

export default
function(
  type: Function | string ,
  children?: Array<Virtualdom | string | number|ReactiveState>
): Virtualdom ;
export default
function(
  type:  "",
  children?: Array<Virtualdom | string | number|ReactiveState>
):  Array<Virtualdom | string | number|ReactiveState>;
export default
function (
  type: "",
  props?: object = {},
  ...children: Array<Virtualdom | string | number|ReactiveState>
): Array<Virtualdom | string | number|ReactiveState>;

export default
function (
  type: Function | string ,
  props?: object = {},
  ...children: Array<Virtualdom | string | number|ReactiveState>
): Virtualdom ;

//如果第二个参数是数组，则 变成
/* 
h(type,...children)
h(type,children)
*/


export default (type,propsorchildren,...children)=>
{



if(isarray(propsorchildren)){
return createElement(type,undefined,[...propsorchildren,...children].flat(1/0))
}
else{
return createElement(...arguments)
}
}


 function createElement<T extends Function | string>(
  type:T,
  props?: ElementAttrs,
  ...children: any[]
): Virtualdom<T>;
 function createElement(
  type: Function | string = "",
  props: ElementAttrs= {},
  ...children: Array<Virtualdom | string |number| ReactiveState>
): Virtualdom | Array<Virtualdom | string | number|ReactiveState> {
  // | Array<Virtualdom | string>
  // if(isarray()){}
  /* add fragment element */
  //   console.log(type, props, children);
  let typenormalized = isstring(type) || isfunction(type) ? type : "";
  const propsnormalized = isplainobject(props) ? props : {};
  const childrennormalized = children.flat(Infinity).map(a=>a===0?"0":a).filter(a=>!!a);
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
  }else

  /* propsnormalized = Object.fromEntries(
    Object.entries(propsnormalized).map(([key, value]) => [
      key.trim().toLowerCase(),
      value
    ])
  ); */
{
  return new Virtualdom(typenormalized, propsnormalized, childrennormalized);
}
}

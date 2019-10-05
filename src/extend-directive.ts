import { invalid_Function } from "./context-mounted-unmounted-";
import Virtualdom from "./virtualdom";
export interface Extendfun {
  (element?: Element, value: any, vdom?: Virtualdom): void;
}
export interface ExtendOptions{

  [s: string]: Extendfun;

}
import directives from "./directives";
export default function extenddirectives(options: ExtendOptions
={}
)

 {
  Object.entries(options).forEach(([key, value]) => {
    if (typeof value !== "function") {
console.error(value)
console.error(invalid_Function)
      throw TypeError();
    } else {
if(!directives[key] ){
Reflect.set(
directives,key, value);
}else{
console.error(directives)
console.error("do not extend existing directive" )
throw new Error()
}
      
    }
  });
return directives
}

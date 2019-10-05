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
      throw TypeError(invalid_Function);
    } else {
if(!directives[key] ){
Reflect.set(
directives,key, value);
}else{
throw new Error
}
      
    }
  });
return directives
}

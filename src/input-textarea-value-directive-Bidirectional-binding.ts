import ReactiveState, {
  dispatchsymbol,
  textnodesymbol
} from "./primitivestate";
import directives from "./extend-directive.ts"

directives({value(element,value,vdom){

if(value instanceof ReactiveState &&(vdom.type==="input"||vdom.type==="textarea"))
{




}else{



throw TypeError("invalid ReactiveState or element")


}
}})

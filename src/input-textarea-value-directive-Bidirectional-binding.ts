import ReactiveState, {
  dispatchsymbol,
  textnodesymbol
} from "./primitivestate";
import directives from "./extend-directive.ts"

directives({value(element,value,vdom){

if(value instanceof ReactiveState &&(vdom.type==="input"||vdom.type==="textarea"))
{


vdom.bindattr[value]=value


["change","input"].forEach(eventname=>{

const origin= vdom.onevent[eventname]


const eventsarray=[origin].flat()


vdom.onevent[eventname]=[...eventsarray,e => (value.value = e.target.value)]

})





}else{



throw TypeError("invalid ReactiveState or element")


}
}})

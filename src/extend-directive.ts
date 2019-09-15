
import directives from "./directives";
 export default function extenddirectives(

options

){

Object.entries(options).forEach(([key,value])=>{
if(typeof value!=="function"){

throw TypeError("invalid directive")

}else{


directives[key]=value

}


})







}

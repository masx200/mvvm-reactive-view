import {CallbackReactiveState}from"./computed"


//import { requestAnimationFrame } from "./directives";
import { isFunction ,isarray} from "./util";
import ReactiveState, {
  isReactiveState,
  subscribesymbol,
  removeallistenerssymbol,
  addallistenerssymbol
} from './reactivestate';
import { invalid_ReactiveState } from "./conditon";
import { invalid_Function } from "./context-mounted-unmounted-";
export function watch<T>(state:ReactiveState <T>| Array<ReactiveState<T>>,

callback:CallbackReactiveState<T>){
if(isarray(state))
{
state.forEach(state=>{

watchsingle(state,()=>{

callback(...state)
})

})
}
else if(isReactiveState(state)){

watchsingle(state ,callback)
}else{
console.error(state);
    console.error(callback);
throw new TypeError()
}

}



function watchsingle(
  state: ReactiveState,
  callback: Function,
//  statekey?: string
): void {
  if (
    !(
      isReactiveState(state) &&
      // state instanceof ReactiveState
      isFunction(callback)
    )
  ) {
    
    throw TypeError(invalid_ReactiveState + invalid_Function);
  }



state[subscribesymbol](callback);

//  if (statekey) {
 
//   state[subscribesymbol](callback, statekey);
 // } else {
    
//  }

  requestAnimationFrame(() => {
rewatch(state)
   // state[addallistenerssymbol]();
  });
}
export function unwatch(state: ReactiveState): void {
  state[removeallistenerssymbol]();
}

export function rewatch(state: ReactiveState): void {
  state[addallistenerssymbol]();
}

// import deepobserve from "deep-observe-agent-proxy";
import { set } from "../UtilTools/reflect";
import { isfunction, isobject, isprimitive } from "../UtilTools/util";
import { getproperyreadproxy } from "./getproperyread-proxy";
// import { getproperyreadproxy } from "./computed";
import handleobjectstate from "./handle-object-state";
import ReactiveState, {
  dispatchsymbol,
  invalid_primitive_or_object_state,
  // textnodesymbol,
  isReactiveState
} from "./ReactiveState";
import { UnwrapedState } from "./watch";
export const set_prototype = Set.prototype;

export default function<T extends UnwrapedState>(
  init: ReactiveState<T>
): ReactiveState<T>;
export default function<T extends UnwrapedState>(
  init: Exclude<T, ReactiveState<any>> | undefined
): ReactiveState<T>;
export default function<T extends UnwrapedState>(
  init: Exclude<T, ReactiveState<any>> | ReactiveState<T> | undefined
): ReactiveState<T> {
  /* 收集组件内部创建的 ReactiveState*/
  const state: ReactiveState<T> = createstate(init as any) as ReactiveState<T>;
  //   usestste(state);
  return state;
}

function createstate<T extends UnwrapedState>(
  init: ReactiveState<T>
): ReactiveState<T>;
function createstate<T extends UnwrapedState>(
  init: Exclude<T, ReactiveState<any>> | undefined
): ReactiveState<T>;

function createstate<T extends UnwrapedState>(
  init: Exclude<T, ReactiveState<any>> | ReactiveState<T> | undefined
) {
  /*   if (!(isprimitive(init) || isobject(init) || isReactiveState(init))) {
    console.error(init);
    console.error(invalid_primitive_or_object_state);
    throw TypeError();
  } */
  // /*   const inittype = isfunction(init)
  //     ? "function"
  //     : isprimitive(init)
  //     ? "primitive"
  //     : /* isobject(init)
  //     ? "object" */
  //       /* : */ void 0; */
  if (isprimitive(init) || isfunction(init)) {
    return getproperyreadproxy(
      new Proxy(new ReactiveState(init), {
        defineProperty() {
          return false;
        },
        deleteProperty() {
          return false;
        },
        set(target, key, value) {
          /*  if (key === textnodesymbol) {
          return set(target, key, value);
        } */

          /* 若初始值函数,则只能赋值函数 */
          if (
            key === "value" &&
            ((isprimitive(value) && isprimitive(init)) ||
              (isfunction(value) && isfunction(init)))
          ) {
            if (target[key] !== value) {
              /* 如果相同则不触发事件 */
              set(target, key, value);
              target[dispatchsymbol]();
            }
            return true;
          } else {
            console.error(value);
            console.error(init);
            console.error(invalid_primitive_or_object_state);
            throw TypeError();
            // return false;
          }
        },
        setPrototypeOf() {
          return false;
        }
      })
    );
  } else if (
    isReactiveState(init)
    // init instanceof ReactiveState
  ) {
    // 如果init是个 ReactiveState，则对其解包，并生成新的 ReactiveState
    return createstate(init.valueOf() as any);
  } else if (isobject(init)) {
    //如果在 ReactiveState属性中包含 ReactiveState，则转换成语法糖
    //ReactiveState1=createstate( {aaaaa:ReactiveState2})
    //
    // else {
    //   console.error(init);
    //console.error(invalid_primitive_or_object_state)
    //  throw TypeError();
    //throw TypeError("invalid State");
    // }
    return handleobjectstate(init);
  } else {
    throw Error();
  }
}

// /*
// let initobj=init
// const containReactiveState=(isplainobject(init))&&Object.values(init).map(a=>isReactiveState(a)).includes(true)
// const state_entries=Object.entries(init).filter(([key,a])=>isReactiveState(a))

// if(
// containReactiveState
// ){

// initobj={...init}

// state_entries
// .forEach(
// ([key,state])=>{

// defineProperty(initobj,key,{
// enumerable:true,
// get(){

// return state.valueOf()

// },
// configurable: true

// })

// })

// }
// let reactive
// =new ReactiveState(

// initobj

// )

// if(containReactiveState){
// state_entries.forEach(
// ([key,state])=>{

// watch(state,()=>{

// reactive[dispatchsymbol](String(key));

// })
// }
// )
// }

//     return new Proxy(
// reactive

// , {
//     ownKeys(target) {
//     return Array.from(
//       new Set([...ownKeys(target), ...ownKeys(get(target, "value"))])
//     );
//   }
//   ,
//   setPrototypeOf() {
//     return false;
//   },
//       defineProperty() {
//         return false;
//       },
//       getOwnPropertyDescriptor(target, key) {
//         const myvalue = get(target, "value");

//         const descripter =
//           getOwnPropertyDescriptor(target, key) ||
//           getOwnPropertyDescriptor(myvalue, key);
//         if (descripter) {
//           descripter.configurable = true;
//         }

//         return descripter;
//       },
//       deleteProperty(target, key) {
//         const myvalue = get(target, "value");
//         if (has(myvalue, key)) {
//           deleteProperty(myvalue, key);
//           target[dispatchsymbol](String(key));
//           return true;
//         } else {
//           return true;
//         }
//       },
//       has(target, key) {
//         const myvalue = get(target, "value");
//         return has(target, key) || has(myvalue, key);
//       },
//       get(target, key) {
//         const value = get(target, "value");

//         if (
//           key === "value" &&
//           (isarray(value)  || isplainobject(value))
//         ) {
//           return deepobserve(get(target, key), (_target_, patharray) => {
//             target[dispatchsymbol](patharray[0]);
//           });
//         } else if (has(target, key)) {
//           return get(target, key);
//         } else if (has(value, key)) {
//           if (isSet(value) ) {
//             const myvalue = value;
//             if (key === "add") {
//               return (add: any) => {
//                 if (!set_prototype.has.call(myvalue, add)) {
//                   const returnvalue = set_prototype[key].call(myvalue, add);
//                   target[dispatchsymbol]();
//                   return returnvalue;
//                 }
//               };
//             } else if (key === "delete") {
//               return (dele: any) => {
//                 if (
// set_prototype.has.call(myvalue, dele)) {
//                   const returnvalue = set_prototype[key].call(myvalue, dele);
//                   target[dispatchsymbol]();
//                   return returnvalue;
//                 }
//               }
// else if (key === "clear") {
//               return () => {
//                 if (value.length) {
//                   const returnvalue = set_prototype[key].call(myvalue);
//                   target[dispatchsymbol]();
//                   return returnvalue;
//                 }
//               }
// else {

// return  get(value, key)
// }

//             }
//           } else {
// //只深度观察array和plainobject
// if(
// (isarray(value)  || isplainobject(value))
// ){
// return deepobserve(get(value, key), () => {
//               target[dispatchsymbol](String(key));
//             });
// }
// else{
// return get(value, key)
// }

//           }

//           /*  */
//         }
//     }},

//     set(target, key, value)
//      {

// if(isReactiveState(value)){
// //如果遇到 isReactiveState则自动解包
// value=value.valueOf()

// }
//       /*   if (key === textnodesymbol) {
//         return set(target, key, value);
//       } */
//       const myvalue = get(target, "value");
//       if (key === "value" && isobject(value)) {
//         // if (target[key] !== value) {
//         set(target, key, value);
//         target[dispatchsymbol]();

//         // }
//         return true;
//       } else if (!has(target, key)) {
//         set(myvalue, key, value);
//         target[dispatchsymbol](String(key));

//         //
//       } else if (key === "length") {
//         set(myvalue, key, value);
//         target[dispatchsymbol](key);
//       } else {
//         return false;
//       }
//       return true;

//     }

// }) */

// import { checkctxandcallbck } from "./checkctxandcallbck";
// import { UnMountedSet } from './Component-context';
// export function useUnMounted(fun: () => void) {
//     checkctxandcallbck(fun);
//     UnMountedSet.add(fun);
//     // if (isFunction(fun)) {
//     //     if (ctxopen) {
//     //         UnMountedSet.add(fun);
//     //     } else {
//     //         console.error(errormessage);
//     //         throw Error();
//     //     }
//     // } else {
//     //     console.error(fun);
//     //     console.error(invalid_Function);
//     //     throw TypeError();
//     // }

import { unmountedctx } from './Component-context';

// }
export function useUnMounted(fun: () => void) {
    unmountedctx.add(fun);
}
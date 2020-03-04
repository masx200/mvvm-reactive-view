// import { checkctxandcallbck } from "./checkctxandcallbck";
// import { MountedSet } from './Component-context';
// export function useMounted(fun: () => void) {
//     checkctxandcallbck(fun);
//     MountedSet.add(fun);
//     // if (isFunction(fun)) {
//     //     if (ctxopen) {
//     //         MountedSet.add(fun);
//     //     } else {
//     //         console.error(errormessage);
//     //         throw Error();
//     //     }
//     // } else {
//     //     console.error(fun);
//     //     console.error(invalid_Function);
//     //     throw TypeError();
//     // }

import { updatedctx } from "./Component-context";

// import { mountedctx } from "./Component-context";

// }
export function useUpdated(fun: () => void) {
    updatedctx.add(fun);
}

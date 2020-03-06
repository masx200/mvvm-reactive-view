// type ReturnType<T extends (...args: any) => any> = T extends (
//     ...args: any
// ) => infer R
//     ? R
//     : any;
export type UnWrapArray<T extends Array<any>> = T extends Array<infer R>
    ? R
    : never;

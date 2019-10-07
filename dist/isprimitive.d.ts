declare type Primitive = string | number | boolean | undefined | bigint;
export default function (a: any): a is Primitive;
export {};

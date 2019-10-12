import Virtualdom from "../../src/VirtualElement";

/* declare module "htm" {
  const htm: (
    strings?: TemplateStringsArray,
    ...values: any[]
  ) => Virtualdom<any>;
  export default htm;
}
 */
declare interface Htm {
  (strings?: TemplateStringsArray, ...values: any[]): Virtualdom<any>;
}
declare const htm: Htm;
export default htm;

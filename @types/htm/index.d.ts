import Virtualdom from "../../src/virtualdom";

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

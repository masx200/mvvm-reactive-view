import flattenDepth from "lodash/flattenDepth";
if (typeof Array.prototype.flat !== "function") {
  Array.prototype.flat = function(depth: number = 1) {
    return flattenDepth(this, depth);
  };
  //arrayflat;
}

/* function arrayflat(depth: number = 1) {
  if (depth === 1) {
    return this.reduce(
      (acc: { concat: (arg0: any) => void }, val: any) => acc.concat(val),
      []
    );
  } else {
    return flattenDeep(this);
  }
}
function flattenDeep(arr1: any[]) {
  return arr1.reduce(
    (acc: { concat: { (arg0: any): void; (arg0: any): void } }, val: any) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
}
export function flat(arr: any, depth?: any) {
  return arrayflat.call(arr, depth);
}
 */

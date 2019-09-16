function flattenDeep(arr1: any[]): Array<any> {
  return arr1.reduce(
    (acc: { concat: { (arg0: any): void; (arg0: any): void } }, val: any) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
}
function arrayflat(depth = 1): Array<any> {
  if (depth <= 1) {
    return this.reduce(
      (acc: { concat: (arg0: any) => void }, val: any) => acc.concat(val),
      []
    );
  } else {
    return flattenDeep(this);
  }
}

// import flattenDepth from "lodash/flattenDepth";
// import flattenDepth from "core-js-pure/features/array/flat";
if (typeof Array.prototype.flat !== "function") {
  Array.prototype.flat =
    //   function(depth: number = 1) {
    //     return flattenDepth(this, depth);
    //   };
    arrayflat;
}

/*
export function flat(arr: any, depth?: any) {
  return arrayflat.call(arr, depth);
}
 */

if (typeof Array.prototype.flat !== "function") {
  Array.prototype.flat = function(depth = 1) {
    if (depth === 1) {
      return this.reduce(
        (acc: { concat: (arg0: any) => void }, val: any) => acc.concat(val),
        []
      );
    } else {
      function flattenDeep(arr1: any[]) {
        return arr1.reduce(
          (
            acc: { concat: { (arg0: any): void; (arg0: any): void } },
            val: any
          ) =>
            Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
          []
        );
      }
      return flattenDeep(this);
    }
  };
}

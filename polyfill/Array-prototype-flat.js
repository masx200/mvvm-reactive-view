(() => {
  function flattenDeep(arr1) {
    return arr1.reduce(
      (acc, val) => acc.concat(Array.isArray(val) ? flattenDeep(val) : val),

      []
    );
  }

  function arrayflat(depth = 1) {
    if (depth <= 1) {
      return this.reduce((acc, val) => acc.concat(val), []);
    } else if (depth > 10) {
      return flattenDeep(this);
    } else {
      let result = [...this];
      while (depth >= 1) {
        result = arrayflat.call(result);
        depth--;
      }
      return result;
    }
  }

  if (typeof Array.prototype.flat !== "function") {
    Array.prototype.flat = arrayflat;
  }
})();

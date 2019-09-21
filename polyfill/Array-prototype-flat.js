function flattenDeep(arr1) {
  return arr1.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
}

function arrayflat(depth = 1) {
  if (depth <= 1) {
    return this.reduce((acc, val) => acc.concat(val), []);
  } else {
    return flattenDeep(this);
  }
}

if (typeof Array.prototype.flat !== "function") {
  Array.prototype.flat = arrayflat;
}

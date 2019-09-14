export const globalthis = new Function("return this")();
if (!globalthis.globalThis) {
  globalthis.globalThis = globalthis;
}

const setImmediate = async (fn: Function, ...args: any[]) => {
  await Promise.resolve();
  return fn(...args);
};
if (typeof globalthis.setImmediate !== "function") {
  globalthis.setImmediate = setImmediate;
}
export { setImmediate };

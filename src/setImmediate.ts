export const globalthis = new Function("return this")();
const setImmediate = async (fn: Function, ...args: any[]) => {
  await Promise.resolve();
  return fn(...args);
};
if (typeof globalthis.setImmediate !== "function") {
  globalthis.setImmediate = setImmediate;
}
export { setImmediate };

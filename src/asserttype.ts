export function asserttype(con: boolean): asserts con {
  if (!con) {
    throw new TypeError();
  }
}

export function asserttype(con: boolean) {
  if (!con) {
    throw new TypeError();
  }
}

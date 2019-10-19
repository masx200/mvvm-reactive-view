export function setimmediate(fun: Function) {
  return Promise.resolve().then(() => fun());
}

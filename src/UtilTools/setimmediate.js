export function setimmediate(fun) {
    return Promise.resolve().then(() => fun());
}
//# sourceMappingURL=setimmediate.js.map

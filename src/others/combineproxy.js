const proxyset = new WeakSet();
export function isproxy(a) {
    return proxyset.has(a);
}
export const proxytohandler = new WeakMap();
export function combineproxy(target, newhandler) {
    if (isproxy(target)) {
        const oldhandler = proxytohandler.get(target);
        if (oldhandler) {
            Object.assign(oldhandler, newhandler);
        } else {
            throw new TypeError();
        }
        return target;
    } else {
        const pro = new Proxy(target, newhandler);
        proxytohandler.set(pro, newhandler);
        proxyset.add(pro);
        return pro;
    }
}
//# sourceMappingURL=combineproxy.js.map

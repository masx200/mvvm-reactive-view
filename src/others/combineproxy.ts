const proxyset: WeakSet<object> = new WeakSet();
export function isproxy(a: any): boolean {
    return proxyset.has(a);
}
// export const proxytotarget = new WeakMap<object, object>();
export const proxytohandler = new WeakMap<object, ProxyHandler<object>>();
export function combineproxy<T extends object>(
    target: T,
    newhandler: ProxyHandler<T>
): T {
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
        // proxytotarget.set(pro, target);
        proxytohandler.set(pro, newhandler);
        proxyset.add(pro);
        return pro;
    }
}

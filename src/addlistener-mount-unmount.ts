const connectedeventname = Symbol("mounted").toString();
const disconnectedeventname = Symbol("unmounted").toString();
const callback = function(
    mutations: MutationRecord[],
    observer: MutationObserver
) {
    console.log(observer);
    mutations.forEach(function(record: MutationRecord) {
        console.log("Mutation: ", record);
        /* 子元素也要触发事件 */
        const addedNodes = [...record.addedNodes];
        addedNodes.forEach(e => {
            if (e instanceof Element) {
                // dispatchconnected(e);
                const subnodes = [...e.querySelectorAll("*"), e];
                subnodes.forEach(n => {
                    dispatchconnected(n);
                });
            }
        });
        const removedNodes = [...record.removedNodes];
        removedNodes.forEach(e => {
            if (e instanceof Element) {
                // dispatchdisconnected(e);
                const subnodes = [...e.querySelectorAll("*"), e];
                subnodes.forEach(n => {
                    dispatchdisconnected(n);
                });
            }
        });
    });
};
function dispatchconnected(e: Node) {
    e.dispatchEvent(new Event(connectedeventname));
}
function dispatchdisconnected(e: Node) {
    e.dispatchEvent(new Event(disconnectedeventname));
}
var mo = new MutationObserver(callback);

var option = {
    childList: true,

    subtree: true
};

mo.observe(document.body, option);
export function addmountedlistner(ele: Element, call: () => void) {
    ele.addEventListener(connectedeventname, () => {
        // Promise.resolve().then(() => {
        call();
        // });
    });
}

export function addunmountedlistner(ele: Element, call: () => void) {
    ele.addEventListener(disconnectedeventname, () => {
        // Promise.resolve().then(() => {
        call();
        // });
    });
}

const rootnode = document.body;
const connectedeventname = Symbol("mounted").toString();
const disconnectedeventname = Symbol("unmounted").toString();
const callback = function(
    mutations: MutationRecord[]
    // observer: MutationObserver
) {
    // console.log(observer);
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
const mo = new MutationObserver(callback);

const option = {
    childList: true,

    subtree: true
};

mo.observe(rootnode, option);

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
const updatedeventname = Symbol("updated").toString();
export function addupdatedlistner(ele: Element, call: () => void) {
    ele.addEventListener(updatedeventname, () => {
        // Promise.resolve().then(() => {
        call();
        // });
    });
}
new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach(function(record: MutationRecord) {
        console.log("Mutation: ", record);
        const target = record.target;
        dispatchupdated(target);
    });
}).observe(rootnode, {
    /* 监听子节点 */
    subtree: true,
    attributes: true,
    childList: true,
    characterData: true
});
function dispatchupdated(e: Node) {
    /* 冒泡一下,让父节点都触发事件update */
    e.dispatchEvent(new Event(updatedeventname, { bubbles: true }));
}

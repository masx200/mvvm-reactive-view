const rootnode = document.body;
const connectedeventname = Symbol("mounted").toString();
const disconnectedeventname = Symbol("unmounted").toString();
const callback = function(mutations: MutationRecord[]) {
    mutations.forEach(function(record: MutationRecord) {
        console.log("Mutation: ", record);

        const addedNodes = [...record.addedNodes];
        addedNodes.forEach((e) => {
            if (e instanceof Element) {
                const subnodes = [...e.querySelectorAll("*"), e];
                subnodes.forEach((n) => {
                    dispatchconnected(n);
                });
            }
        });
        const removedNodes = [...record.removedNodes];
        removedNodes.forEach((e) => {
            if (e instanceof Element) {
                const subnodes = [...e.querySelectorAll("*"), e];
                subnodes.forEach((n) => {
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
        call();
    });
}

export function addunmountedlistner(ele: Element, call: () => void) {
    ele.addEventListener(disconnectedeventname, () => {
        call();
    });
}
const updatedeventname = Symbol("updated").toString();
export function addupdatedlistner(ele: Element, call: () => void) {
    ele.addEventListener(updatedeventname, () => {
        call();
    });
}
new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach(function(record: MutationRecord) {
        console.log("Mutation: ", record);
        const target = record.target;
        dispatchupdated(target);
    });
}).observe(rootnode, {
    subtree: true,
    attributes: true,
    childList: true,
    characterData: true
});
function dispatchupdated(e: Node) {
    e.dispatchEvent(new Event(updatedeventname, { bubbles: true }));
}
const createdeventname = Symbol("created").toString();
export function addcreatedlistner(ele: Element, call: () => void) {
    ele.addEventListener(
        createdeventname,
        () => {
            call();
        },
        { once: true }
    );
}
export function dispatchcreated(e: Node) {
    e.dispatchEvent(new Event(createdeventname));
}
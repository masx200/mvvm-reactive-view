const rootnode = document.body;
export const connectedeventname = Symbol("mounted").toString();
export const disconnectedeventname = Symbol("unmounted").toString();
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

export const updatedeventname = Symbol("updated").toString();
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
export const createdeventname = Symbol("created").toString();
export function dispatchcreated(e: Node) {
    e.dispatchEvent(new Event(createdeventname));
}

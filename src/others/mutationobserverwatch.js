import { gettagtype } from "src/UtilTools/util";
function istextnode(e) {
    return gettagtype(e) === "Text";
}
function gettextnodes(container) {
    return [...container.childNodes].filter((e) => {
        return istextnode(e);
    });
}
const rootnode = document.body;
export const connectedeventname = Symbol("mounted").toString();
export const disconnectedeventname = Symbol("unmounted").toString();
const callback = function(mutations) {
    mutations.forEach(function(record) {
        console.log("Mutation: ", record);
        const addedNodes = [...record.addedNodes];
        addedNodes.forEach((e) => {
            if (e instanceof Element) {
                const subeles = [...e.querySelectorAll("*"), e];
                const subtexts = subeles.map((e) => gettextnodes(e));
                [...subeles, ...subtexts].flat(1 / 0).forEach((n) => {
                    dispatchconnected(n);
                });
            }
        });
        const removedNodes = [...record.removedNodes];
        removedNodes.forEach((e) => {
            if (e instanceof Element) {
                const subeles = [...e.querySelectorAll("*"), e];
                const subtexts = subeles.map((e) => gettextnodes(e));
                [...subeles, ...subtexts].flat(1 / 0).forEach((n) => {
                    dispatchdisconnected(n);
                });
            }
        });
    });
};
function dispatchconnected(e) {
    e.dispatchEvent(new Event(connectedeventname));
}
function dispatchdisconnected(e) {
    e.dispatchEvent(new Event(disconnectedeventname));
}
const mo = new MutationObserver(callback);
const option = {
    childList: true,
    subtree: true
};
mo.observe(rootnode, option);
export const updatedeventname = Symbol("updated").toString();
new MutationObserver((mutations) => {
    mutations.forEach(function(record) {
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
function dispatchupdated(e) {
    e.dispatchEvent(new Event(updatedeventname, { bubbles: true }));
}
export const createdeventname = Symbol("created").toString();
export function dispatchcreated(e) {
    e.dispatchEvent(new Event(createdeventname));
}
//# sourceMappingURL=mutationobserverwatch.js.map

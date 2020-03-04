var callback = function(
    mutations: MutationRecord[],
    observer: MutationObserver
) {
    console.log(observer);
    mutations.forEach(function(record: MutationRecord) {
        console.log("Mutation: ", record);
        [...record.addedNodes].forEach(e => {
            e.dispatchEvent(new Event("connected"));
        });
        [...record.removedNodes].forEach(e => {
            e.dispatchEvent(new Event("disconnected"));
        });
    });
};

var mo = new MutationObserver(callback);

var option = {
    childList: true,

    subtree: true
};

mo.observe(document.body, option);
export function addmountedlistner(ele: Element, call: () => void) {
    ele.addEventListener("connected", () => {
        Promise.resolve().then(() => {
            call();
        });
    });
}

export function addunmountedlistner(ele: Element, call: () => void) {
    ele.addEventListener("disconnected", () => {
        Promise.resolve().then(() => {
            call();
        });
    });
}

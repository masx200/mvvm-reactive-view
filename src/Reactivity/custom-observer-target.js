export default class ObserverTarget {
    constructor() {
        this.Listeners = new Set();
    }
    addListener(listener) {
        const listenerset = this.Listeners;
        listenerset.add(listener);
    }
    dispatch() {
        const listenerset = this.Listeners;
        listenerset.forEach((listener) => {
            Promise.resolve().then(() => {
                listener();
            });
        });
    }
    removeListener(listener) {
        const listenerset = this.Listeners;
        listenerset.delete(listener);
    }
}
//# sourceMappingURL=custom-observer-target.js.map

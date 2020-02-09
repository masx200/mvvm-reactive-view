export default class ObserverTarget {
    Listeners: Set<Listener> = new Set();
    addListener(listener: Listener): void {
        const listenerset: Set<Listener> = this.Listeners;

        listenerset.add(listener);
    }
    dispatch() {
        const listenerset: Set<Listener> = this.Listeners;
        listenerset.forEach(listener => {
            Promise.resolve().then(() => {
                listener();
            });
        });
    }
    removeListener(listener: Listener): void {
        const listenerset: Set<Listener> = this.Listeners;
        listenerset.delete(listener);
    }
}
export interface Listener {
    (): any;
}

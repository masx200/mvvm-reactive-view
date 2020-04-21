export default class ObserverTarget {
    Listeners: Set<Listener>;
    addListener(listener: Listener): void;
    dispatch(): void;
    removeListener(listener: Listener): void;
}
export interface Listener {
    (): void;
}
//# sourceMappingURL=custom-observer-target.d.ts.map

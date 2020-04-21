interface DebounceSettings {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
}
declare function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait?: number,
    options?: DebounceSettings
): T;
declare var debounce_1: typeof debounce;
export default debounce_1;
//# sourceMappingURL=debounce.d.ts.map

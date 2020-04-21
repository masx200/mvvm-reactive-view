export function merge_entries(a) {
    const m = {};
    a.forEach(([key, value]) => {
        if (!m[key]) {
            m[key] = new Set();
        }
        value.forEach((v) => {
            m[key].add(v);
        });
    });
    return Object.entries(m).map(([k, v]) => [k, [...v]]);
}
//# sourceMappingURL=merge-entries.js.map

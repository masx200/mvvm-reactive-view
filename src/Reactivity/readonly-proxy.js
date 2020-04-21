import { combineproxy } from "src/others/combineproxy";
const handler = {
    set() {
        return true;
    },
    defineProperty() {
        return false;
    },
    deleteProperty() {
        return false;
    },
    setPrototypeOf() {
        return false;
    }
};
export default function(target) {
    return combineproxy(target, Object.assign({}, handler));
}
//# sourceMappingURL=readonly-proxy.js.map

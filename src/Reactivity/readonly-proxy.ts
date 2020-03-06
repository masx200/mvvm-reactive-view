import { combineproxy } from "src/others/combineproxy";

export default function<T extends object>(target: T): T {
    return combineproxy(target, {
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
    });
}

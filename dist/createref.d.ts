interface Ref<T = any | undefined> {
    value: T | undefined;
}
export default function createRef<T = any | undefined>(value?: T): Ref<T>;
export {};

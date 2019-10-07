interface Ref<T> {
    value: T;
}
export default function createRef<T>(value: T): Ref<T>;
export {};

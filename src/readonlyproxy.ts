export default function<T extends object>(target: T): Readonly<T> {
  return new Proxy(target, {
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

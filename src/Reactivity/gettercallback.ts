export interface gettercallback<T, P extends Array<any>> {
    (...args: P): T;
}

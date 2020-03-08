import ReactiveState, { tagtypesym } from "./reactivestate";
export function getstatetype(state: ReactiveState<any>): string {
    return state[tagtypesym];
}

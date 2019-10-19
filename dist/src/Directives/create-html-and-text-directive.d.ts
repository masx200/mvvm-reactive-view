import ReactiveState from "src/Reactivity/ReactiveState";
export { createhtmlandtextdirective };
declare function createhtmlandtextdirective(seteletext: Function, errorname: string): (ele: Element, text: string | ReactiveState<any>) => void;

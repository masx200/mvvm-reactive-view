import Virtualdom from "./virtualdom";
import ReactiveState from "./primitivestate";
export default function(
  conditon: ReactiveState,
  iftrue:
    | Virtualdom
    | string
    | Array<Virtualdom | string | ReactiveState>
    | ReactiveState,
  iffalse?:
    | Virtualdom
    | string
    | Array<Virtualdom | string | ReactiveState>
    | ReactiveState
): Virtualdom {}

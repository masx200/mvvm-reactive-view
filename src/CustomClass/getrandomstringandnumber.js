export { getrandomstringandnumber };
import { get } from "../UtilTools/reflect";
const charactorlist = Array(26)
    .fill(undefined)
    .map((v, i) => 97 + i)
    .map((n) => String.fromCharCode(n));
const hexnumberlist = Array(16)
    .fill(undefined)
    .map((v, i) => i)
    .map((a) => a.toString(16));
const charactorandnumberlist = [
    ...new Set([...hexnumberlist, ...charactorlist])
];
function getrandomcharactor() {
    return get(charactorlist, Math.floor(Math.random() * charactorlist.length));
}
function getrandomhexnumberandcharactor() {
    return get(
        charactorandnumberlist,
        Math.floor(Math.random() * charactorandnumberlist.length)
    );
}
function getrandomstringandnumber(length = 1) {
    return (
        Array(length)
            .fill(undefined)
            .map(() => getrandomcharactor())
            .join("") +
        "-" +
        Array(length)
            .fill(undefined)
            .map(() => getrandomhexnumberandcharactor())
            .join("")
    );
}
//# sourceMappingURL=getrandomstringandnumber.js.map

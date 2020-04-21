import { isfunction } from "../UtilTools/util";
import directives from "../Directives/directives";
import { addmountedlistner } from "src/others/addmountedlistner";
import { addupdatedlistner } from "src/others/addupdatedlistner";
import { addunmountedlistner } from "src/others/addunmountedlistner";
const applydirects = function(element, vdom) {
    Object.entries(vdom.directives).forEach(([name, value]) => {
        const direfun = directives[name];
        if (isfunction(direfun)) {
            direfun(
                value,
                element,
                vdom,
                (call) => {
                    addmountedlistner(element, call);
                },
                (call) => {
                    addunmountedlistner(element, call);
                },
                (call) => {
                    addupdatedlistner(element, call);
                }
            );
        } else {
            console.error(vdom.directives);
            console.error("invalid directives " + name);
            throw new TypeError();
        }
    });
};
export { applydirects };
//# sourceMappingURL=applydirects.js.map

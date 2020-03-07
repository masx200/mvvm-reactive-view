/**@type{import('rollup').WarningHandlerWithDefault}*/
export default ({ loc, frame, message }) => {
    // 打印位置（如果适用）
    if (loc) {
        console.warn(`${loc.file} (${loc.line}:${loc.column}) ${message}`);
        if (frame) console.warn(frame);
    } else {
        console.warn(message);
    }
};

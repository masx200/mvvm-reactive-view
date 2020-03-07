import terser from "rollup-plugin-terser";

const tersercompressplugin = terser.terser({
    sourcemap: true,
    toplevel: true,
    output: {
        comments: !1,
        ascii_only: !0
    },
    compress: {
        toplevel: true,
        unused: true,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"]
    },
    mangle: { properties: false }
});
export { tersercompressplugin };

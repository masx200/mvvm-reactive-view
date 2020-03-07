import terser from "rollup-plugin-terser";
export const beautifyterserplugin = terser.terser({
    sourcemap: true,
    compress: false,
    mangle: false,
    output: {
        ascii_only: !0,
        comments: !1,
        beautify: true
    }
});

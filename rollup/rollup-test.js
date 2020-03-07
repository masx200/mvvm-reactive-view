import replace from "@rollup/plugin-replace";
import jsx from "acorn-jsx";
import process from "process";
process.on("unhandledRejection", (e) => {
    throw e;
});

// import { string } from "rollup-plugin-string";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-ts";
// import rollup from "rollup";
import * as rollup from "rollup";
import postcss from "rollup-plugin-postcss";
import { babeljsxplugin } from "./babeljsxplugin";
import { beautifyterserplugin } from "./beautifyterserplugin";
// import { rollupbuild } from "./rollupbuild";
import rolluponwarn from "./rolluponwarn.js";
import { tersercompressplugin } from "./tersercompressplugin";
/**@type { rollup.InputOptions} */
const inputOptions1 = {
    acornInjectPlugins: [jsx()],
    input: "./test/src/index.ts",
    onwarn: rolluponwarn,
    plugins: [
        typescript({
            tsconfig: (resolvedConfig) => ({
                ...resolvedConfig,
                declaration: false,
                // jsx: "preserve",
                declarationDir: null
            })
        }),

        json(),
        resolve(),
        commonjs(),
        // beautifyterserplugin,
        // @ts-ignore
        postcss({
            minimize: true,
            extract: false,
            inject: false
        })
        // beautifyterserplugin
    ]
};
/**@type {  rollup.OutputOptions} */
const outputOptions1 = {
    file: "./test/dist/esnext-jsx.js",
    format: "iife",
    sourcemap: true
};
/**@type { rollup.InputOptions} */
const inputOptions2 = {
    input: "./test/dist/esnext-jsx.js",
    onwarn: rolluponwarn,
    plugins: [
        babeljsxplugin,
        // sourcemaps(),

        json(),
        resolve(),
        commonjs(),
        tersercompressplugin,
        replace({ "console.log": "(()=>{})" }),
        beautifyterserplugin
    ]
};
/**@type {  rollup.OutputOptions} */
const outputOptions2 = {
    file: "./test/dist/es2015.js",
    format: "iife",
    sourcemap: true
};
// (async () => {
//     await rollupbuild(inputOptions1, outputOptions1);
//     await rollupbuild(inputOptions2, outputOptions2);
// })();
export default [
    Object.assign({ output: outputOptions1 }, inputOptions1),
    Object.assign({ output: outputOptions2 }, inputOptions2)
];

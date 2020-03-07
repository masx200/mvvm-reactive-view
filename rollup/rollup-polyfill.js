import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import process from "process";
import * as rollup from "rollup";
import { babelenvplugin } from "./babelenvplugin.js";
import rolluponwarn from "./rolluponwarn.js";
import { tersercompressplugin } from "./tersercompressplugin.js";
process.on("unhandledRejection", (e) => {
    throw e;
});

/**@type { rollup.InputOptions} */
const inputOptions1 = {
    input: "./polyfill/index.js",
    onwarn: rolluponwarn,
    plugins: [
        // sourcemaps()
        babelenvplugin,
        resolve(),
        commonjs(),
        tersercompressplugin
    ]
};
/**@type {  rollup.OutputOptions} */
const outputOptions1 = {
    file: "./dist/polyfill.js",
    format: "iife",
    sourcemap: true
};

// (async () => {
//     await rollupbuild(inputOptions1, outputOptions1);
// })();
export default [Object.assign({ output: outputOptions1 }, inputOptions1)];

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-ts";
import process from "process";
// import rollup from "rollup";
import * as rollup from "rollup";
import { babelenvplugin } from "./babelenvplugin.js";
import { beautifyterserplugin } from "./beautifyterserplugin.js";
import rolluponwarn from "./rolluponwarn.js";
import { tersercompressplugin } from "./tersercompressplugin.js";
process.on("unhandledRejection", (e) => {
    throw e;
});

const banner = `
const globalThis = Function('return this')();
const self = globalThis;
const window = globalThis;
const global = globalThis;
const {WeakSet,WeakMap,Date, RegExp, Event, requestAnimationFrame, URL, Blob, Element, Node, String, Array, document, Object, Reflect, Proxy, Symbol, Boolean, Promise, Set, Math, Error, TypeError, JSON, Map, clearTimeout, setTimeout, parseInt} = globalThis;
`;
/**@type { rollup.InputOptions} */
const inputOptions1 = {
    input: "./src/index.ts",
    onwarn: rolluponwarn,
    plugins: [
        json(),
        resolve(),
        commonjs(),

        // sourcemaps(),
        typescript({
            tsconfig: (resolvedConfig) => ({
                ...resolvedConfig,
                declaration: true,
                // jsx: "preserve",
                declarationDir: "./@types/"
            })
        }),
        beautifyterserplugin
    ]
};
/**@type {  rollup.OutputOptions} */
const outputOptions1 = {
    // sourceMap: true,
    banner,
    file: "./dist/index.js",
    format: "esm",
    sourcemap: true
};

/**@type { rollup.InputOptions} */
const inputOptions2 = {
    input: "./dist/index.js",
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
const outputOptions2 = {
    file: "./dist/index.min.js",
    format: "esm",
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

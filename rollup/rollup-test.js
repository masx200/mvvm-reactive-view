import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import process from "process";
// import * as rollup from 'rollup';
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-ts";
import { beautifyterserplugin } from "./beautifyterserplugin";
import rolluponwarn from "./rolluponwarn.js";
process.on("unhandledRejection", (e) => {
    throw e;
});
const csstostringplugin = postcss({
    minimize: true,
    extract: false,
    inject: false
});
const inputOptions = {
    input: "./test/src/index.ts",
    onwarn: rolluponwarn,
    plugins: [
        csstostringplugin,
        typescript({
            transpileOnly: true,
            transpiler: "babel",
            tsconfig: (resolvedConfig) => ({
                ...resolvedConfig,
                declaration: true,
                declarationDir: "test/dist"
            }),
            babelConfig: {
                plugins: [
                    [
                        "babel-plugin-htm",
                        {
                            tag: "html",
                            pragma: "h"
                        }
                    ],
                    [
                        "@babel/plugin-transform-react-jsx",
                        {
                            pragma: "h",
                            pragmaFrag: "''"
                        }
                    ],

                    "@babel/plugin-proposal-class-properties",
                    "@babel/plugin-proposal-optional-catch-binding",
                    "@babel/plugin-proposal-nullish-coalescing-operator"
                ],
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            targets: [
                                "last 1 edge version",
                                "last 1 safari version",
                                "last 1 chrome version",
                                "last 1 firefox version"
                            ]
                        }
                    ]
                ]
            }
        }),
        json(),
        resolve(),
        commonjs(),
        replace({
            "console.time": "(()=>{})",
            "console.log": "(()=>{})",
            "console.timeEnd": "(()=>{})",
            "console.error": "(()=>{})",
            "console.dir": "(()=>{})"
        }),
        beautifyterserplugin
    ]
};
const outputOptions = {
    file: "./test/dist/es2015.js",
    format: "iife",
    sourcemap: true
};
export default [Object.assign({ output: outputOptions }, inputOptions)];

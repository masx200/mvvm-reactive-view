import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
// import sourcemaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-ts";
import postcss from "rollup-plugin-postcss";
// import rollup from 'rollup'
const banner = `
const globalThis = Function('return this')();
const self = globalThis;
const window = globalThis;
const global = globalThis;
const {WeakSet,WeakMap,Date, RegExp, Event, requestAnimationFrame, URL, Blob, Element, Node, String, Array, document, Object, Reflect, Proxy, Symbol, Boolean, Promise, Set, Math, Error, TypeError, JSON, Map, clearTimeout, setTimeout, parseInt} = globalThis;
`;
const babeltsxplugin = babel({

extensions:[".ts",".tsx",".js",".jsx"],
    sourceMaps: true,
    inputSourceMap: true,
    babelHelpers: "bundled",
    plugins: [
[
        "@babel/plugin-transform-typescript",{}],
        [
            "@babel/plugin-transform-react-jsx",
            {
                pragma: "h",
                pragmaFrag: "''"
            }
        ],
        [
            "babel-plugin-htm",
            {
                tag: "html",
                pragma: "h"
            }
        ],
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-optional-catch-binding",
        "@babel/plugin-proposal-nullish-coalescing-operator"
    ],
    presets: [["@babel/preset-typescript",
{

isTSX:true,
allExtensions: true,

jsxPragma:"h"

}],
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
});
const beautifyterserplugin = terser({
    sourcemap: true,
    compress: false,
    mangle: false,
    output: {
        ascii_only: !0,
        comments: !1,
        beautify: true
    }
});
const mybabelplugin = babel({
    sourceMaps: true,
    inputSourceMap: true,
    babelHelpers: "bundled",
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
    ],
    plugins: [
        "@babel/plugin-proposal-optional-catch-binding",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-nullish-coalescing-operator",
        "@babel/plugin-proposal-nullish-coalescing-operator"
    ]
});
const myterserplugin = terser({
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
export default [
    {
        input: "./index.ts",
        output: [
            {
                // sourceMap: true,
                banner,
                file: "./dist/index.js",
                format: "esm",
                sourcemap: true
            }
        ],
        plugins: [
            json(),
            resolve(),
            commonjs(),

            // sourcemaps(),
            typescript(),
            beautifyterserplugin
        ]
    },
    {
        input: "./dist/index.js",
        output: [
            {
                // sourceMap: true,
                file: "./dist/index.js",
                format: "esm",
                sourcemap: true
            }
        ],
        plugins: [
            mybabelplugin,
            json(),
            resolve(),
            commonjs(),
            // sourcemaps(),
            beautifyterserplugin
        ]
    },
    {
        input: "./dist/index.js",
        output: [
            {
                file: "./dist/index.min.js",
                format: "esm",
                sourcemap: true
            }
        ],
        plugins: [
            // sourcemaps()
            mybabelplugin,
            resolve(),
            commonjs(),
            myterserplugin
        ]
    },
    {
        input: "./polyfill/index.js",
        output: [
            {
                file: "./dist/polyfill.js",
                format: "iife",
                sourcemap: true
            }
        ],
        plugins: [
            // sourcemaps()
            mybabelplugin,
            resolve(),
            commonjs(),
            myterserplugin
        ]
    },
    {
        input: "./test/src/index.ts",
        output: [
            {
                // sourceMap: true,
                file: "./test/dist/es2015.js",
                format: "iife",
                sourcemap: true
            }
        ],
        plugins: [
            babeltsxplugin,
            // sourcemaps(),

            json(),
            resolve(),
            commonjs(),
            terser({
                sourcemap: true,
                compress: false,
                mangle: false,
                output: {
                    ascii_only: !0,
                    ecma: 5,
                    comments: !1,
                    beautify: true
                }
            }),
            postcss({
                minimize: true,
                extract: false,
                inject: false
            })
        ]
    }
];

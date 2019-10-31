import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";
import typescriptplugin from "rollup-plugin-typescript2";
import typescriptlib from "typescript";
const banner = `const globalThis = Function('return this')();
const self = globalThis;
const window = globalThis;
const global = globalThis;
const {WeakSet,WeakMap,Date, RegExp, Event, CustomEvent, requestAnimationFrame, URL, Blob, Element, Node, String, Array, document, Object, Reflect, Proxy, Symbol, Boolean, Promise, Set, Math, Error, TypeError, EventTarget, JSON, Map, clearTimeout, setTimeout, parseInt,Number} = globalThis;`;
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
        banner,
        file: "./dist/index.js",
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [
      babel({
        // plugins: [
        //   [
        //     "@babel/plugin-transform-react-jsx",
        //     {
        //       pragma: "h",
        //       pragmaFrag: "''"
        //     }
        //   ],
        //   [
        //     "babel-plugin-htm",
        //     {
        //       tag: "html",
        //       pragma: "h"
        //     }
        //   ],
        //   "@babel/plugin-proposal-class-properties"
        // ],
        presets: [
          [
            "@babel/preset-env",
            {
              //   corejs: 3,
              // useBuiltIns: 'usage',
              targets: [
                "last 1 edge version",
                "last 1 safari version",
                "last 1 chrome version",
                "last 1 firefox version"
              ]
              /*  {
                    /* esmodules: true */
              // firefox: "last 1 version",
              // safari: "last 1 version",
              // chrome: "last 1 version",
              // edge: "last 1 version"
              //   } */
            }
          ]
        ]
      }),
      json(),
      resolve(),
      commonjs(),
      typescriptplugin({
        tsconfig: "./tsconfig.json",
        typescript: typescriptlib
      }),
      terser({
        sourcemap: true,
        compress: false,
        mangle: false,
        output: {
          ascii_only: !0,
          comments: !1,
          beautify: true
        }
      }),
      sourcemaps()
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
    plugins: [resolve(), commonjs(), myterserplugin, sourcemaps()]
  }
];

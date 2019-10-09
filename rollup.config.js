import typescriptlib from "typescript";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "rollup-plugin-json";
import typescriptplugin from "rollup-plugin-typescript2";
const banner = `const {CustomEvent,requestAnimationFrame,URL,Blob,Element,Node,String,Array,document,Object,Reflect,Proxy,Symbol,Boolean,Promise,Set,Math,Error,TypeError,EventTarget,JSON,Map,window,clearTimeout,setTimeout,parseInt,globalThis ,self ,global }=Function('return this')();`;
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
    input: "./src/index.ts",
    output: [
      {
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
      typescriptplugin({
        tsconfig: "tsconfig.json",
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
      })
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
    plugins: [resolve(), commonjs(), myterserplugin]
  }
];

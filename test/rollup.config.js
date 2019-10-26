import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import sourcemaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";

const shouldcompress = process.env.NODE_ENV === "production";
export default [
  {
    input: "./test/src/index.js",
    output: [
      {
        file: "./test/dist/output-es2015.js",
        format: "iife",
        sourcemap: true
      }
    ],
    plugins: [
      babel({
        plugins: [
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
          "@babel/plugin-proposal-class-properties"
        ],
        presets: [
          [
            "@babel/preset-env",
            {
              corejs: 3,
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
      terser({
        sourcemap: true,
        compress: shouldcompress
          ? {
              toplevel: true,
              unused: true,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log"]
            }
          : false,
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
      }),
      sourcemaps()
    ]
  }
];

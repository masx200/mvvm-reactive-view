import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "rollup-plugin-json";
import postcss from "rollup-plugin-postcss";
// import generateHtml from "rollup-plugin-generate-html";
// import html from "rollup-plugin-html";
// import scss from "rollup-plugin-scss";
// import typescript from "rollup-plugin-typescript";
/* const myterserplugin = terser({
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
}); */
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
              pragma: "createElement",
              pragmaFrag: "''"
            }
          ],
          "babel-plugin-htm",
          "@babel/plugin-proposal-class-properties"
        ],
        presets: [[
      "@babel/preset-env",
      {
corejs:3,
useBuiltIns:"usage",
        "targets": {
          "esmodules": true
        }
      }
    ]]
      }),
      json(),
      resolve(),
      commonjs(),
      //   typescript(),
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
      /* 加载css为文本,而且不自动添加到head */
      postcss({
        minimize: true,
        // sourceMap: true,
        extract: false,
        inject: false
      })
      /* generateHtml({
        filename: "./test/dist/index.html",
        template: "./test/src/index.html"
      }) */
      //   scss({
      //     /* output: true */
      //   })
      /*   html({
        include: "./test/*.html",
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
          minifyJS: true
        }
      }) */
    ]
  }
  /*  {
    input: "./dist/index.js",
    output: [
      {
        file: "./dist/index.min.js",
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [resolve(), commonjs(), myterserplugin]
  } */
  /*   {
    input: "./test/index.js",
    output: [
      {
        file: "./test/index-es5.js",
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [
      terser({
        compress: false,
        mangle: false,
        output: {
          ecma: 5,
          comments: !1,
          beautify: true
        }
      }),
      babel({
        plugins: ["@babel/plugin-proposal-class-properties"],
        presets: ["@babel/preset-env"]
      })
    ]
  } */
];

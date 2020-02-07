 import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-ts';
import postcss from 'rollup-plugin-postcss';
const banner = `const globalThis = Function('return this')();
const self = globalThis;
const window = globalThis;
const global = globalThis;
const {WeakSet,WeakMap,Date, RegExp, Event, CustomEvent, requestAnimationFrame, URL, Blob, Element, Node, String, Array, document, Object, Reflect, Proxy, Symbol, Boolean, Promise, Set, Math, Error, TypeError, JSON, Map, clearTimeout, setTimeout, parseInt,Number} = globalThis;`;
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
    presets: [[
            '@babel/preset-env',
            {
                targets: [
                    'last 1 edge version',
                    'last 1 safari version',
                    'last 1 chrome version',
                    'last 1 firefox version'
                ]
            }
        ]],
    plugins: [
        '@babel/plugin-proposal-optional-catch-binding',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-nullish-coalescing-operator',
        '@babel/plugin-proposal-nullish-coalescing-operator'
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
        pure_funcs: ['console.log']
    },
    mangle: { properties: false }
});
export default [
    {
        input: './index.ts',
        output: [{
                sourceMap: true,
                banner,
                file: './dist/index.js',
                format: 'esm',
                sourcemap: true
            }],
        plugins: [
            typescript(),
            json(),
            resolve(),
            commonjs(),
            sourcemaps(),
            beautifyterserplugin
        ]
    },
    {
        input: './dist/index.js',
        output: [{
                sourceMap: true,
                file: './dist/index.js',
                format: 'esm',
                sourcemap: true
            }],
        plugins: [
            mybabelplugin,
            json(),
            resolve(),
            commonjs(),
            sourcemaps(),
            beautifyterserplugin
        ]
    },
    {
        input: './dist/index.js',
        output: [{
                file: './dist/index.min.js',
                format: 'esm',
                sourcemap: true
            }],
        plugins: [
            mybabelplugin,
            resolve(),
            commonjs(),
            myterserplugin,
            sourcemaps()
        ]
    },
    {
        input: './polyfill/index.js',
        output: [{
                file: './dist/polyfill.js',
                format: 'iife',
                sourcemap: true
            }],
        plugins: [
            mybabelplugin,
            resolve(),
            commonjs(),
            myterserplugin,
            sourcemaps()
        ]
    },
    {
        input: './test/src/index.js',
        output: [{
                sourceMap: true,
                file: './test/dist/output-es2015.js',
                format: 'iife',
                sourcemap: true
            }],
        plugins: [
            sourcemaps(),
            babel({
                plugins: [
                    [
                        '@babel/plugin-transform-react-jsx',
                        {
                            pragma: 'h',
                            pragmaFrag: '\'\''
                        }
                    ],
                    [
                        'babel-plugin-htm',
                        {
                            tag: 'html',
                            pragma: 'h'
                        }
                    ],
                    '@babel/plugin-proposal-class-properties',
                    '@babel/plugin-proposal-optional-catch-binding',
                    '@babel/plugin-proposal-nullish-coalescing-operator'
                ],
                presets: [[
                        '@babel/preset-env',
                        {
                            targets: [
                                'last 1 edge version',
                                'last 1 safari version',
                                'last 1 chrome version',
                                'last 1 firefox version'
                            ]
                        }
                    ]]
            }),
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
            }),
            sourcemaps()
        ]
    }
];

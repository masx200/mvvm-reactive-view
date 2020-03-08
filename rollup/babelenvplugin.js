import babel from "rollup-plugin-babel";
const babelenvplugin = babel({
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
export { babelenvplugin };

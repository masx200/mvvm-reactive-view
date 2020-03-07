import babel from "rollup-plugin-babel";
const babeljsxplugin = babel({
    // extensions: [".ts", ".tsx", ".js", ".jsx"],
    sourceMaps: true,
    inputSourceMap: true,
    babelHelpers: "bundled",
    plugins: [
        // [
        //     "@babel/plugin-transform-typescript",
        //     {
        //         isTSX: true,
        //         allExtensions: true,
        //         jsxPragma: "h"
        //     }
        // ],
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
    presets: [
        // [
        //     "@babel/preset-typescript",
        //     {
        //         isTSX: true,
        //         allExtensions: true,
        //         jsxPragma: "h"
        //     }
        // ],
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
export { babeljsxplugin };

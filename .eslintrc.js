module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true,
        "jest/globals": true
    },
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.all.json",
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: ["node", "@typescript-eslint", "import", "jest"],
    extends: [
        "eslint:recommended",
        "plugin:node/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        // code
        "max-params": ["warn", 3],
        "max-depth": ["error", 3],
        "max-statements-per-line": ["error", { max: 1 }],
        "max-lines": ["error", { max: 1000, skipBlankLines: true, skipComments: true }],
        "max-lines-per-function": ["warn", { max: 50, skipBlankLines: true, skipComments: true }],
        "@typescript-eslint/ban-ts-ignore": ["warn"],
        "@typescript-eslint/interface-name-prefix": [0, "never"],
        "arrow-parens": ["error"],
        "quote-props": ["error", "consistent-as-needed", { numbers: true }],
        "no-unused-vars": "error",
        "no-useless-escape": "error",
        "no-empty-pattern": "error",
        "no-eval": "error",
        "no-implied-eval": "error",
        "no-prototype-builtins": "error",
        "no-sync": 0,
        "prefer-const": 0,
        "no-process-exit": 0,
        "node/exports-style": ["error", "module.exports"],
        "node/no-unpublished-require": 0,
        "node/no-extraneous-import": 0,
        "node/no-deprecated-api": ["warn"],
        "node/no-missing-require": [
            "error",
            {
                tryExtensions: [".ts", ".js", ".d.ts", ".json", ".node"]
            }
        ],
        "node/no-missing-import": [
            "error",
            {
                tryExtensions: [".ts", ".js", ".d.ts", ".json", ".node"]
            }
        ],
        "node/no-unpublished-import": 0,
        "node/no-unsupported-features/es-syntax": 0,
        "node/shebang": ["warn", {
            "convertPath": {
                "src/index.ts": ["^src/index.ts$", "./dist/index.js"]
            }
        }],
        "import/extensions": [
            "error",
            {
                ts: "never",
                js: "never",
                json: "always"
            }
        ],
        "import/named": "warn",
        "import/no-duplicates": "error",
        "import/no-unresolved": 0,
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-inferrable-types": 0,
        "@typescript-eslint/no-use-before-define": "warn",
        "@typescript-eslint/no-var-requires": "warn",

        // Style
        "max-len": [`error`, { code: 200 }],
        indent: ["error", 4, { SwitchCase: 1 }],
        "linebreak-style": ["error", "windows"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "brace-style": ["error", "stroustrup"],
        "object-curly-spacing": ["error", "always"],
        "no-mixed-spaces-and-tabs": "error",
        "arrow-spacing": ["error"],
        "comma-dangle": ["error", "never"],
        "comma-style": ["error"],
        "no-extra-semi": "error",
        "comma-spacing": "error",
        "space-in-parens": ["error", "never"],
        "space-before-blocks": "error",
        "space-before-function-paren": ["error", { "anonymous": "never", "named": "never", "asyncArrow": "always" }],
        "keyword-spacing": "error",
        "one-var": ["error", "never"]
    }
};

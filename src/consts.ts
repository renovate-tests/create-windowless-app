export const consts = {
    dependencies: [
        "node-notifier",
        "winston"
    ],
    devDependencies: [
        "jest",
        "nexe",
        "webpack",
        "webpack-cli",
        "copy-webpack-plugin",
        "clean-webpack-plugin",
        "cross-spawn"
    ],
    huskyDependencies: [
        "husky"
    ],
    tsDevDependencies: [
        "@types/jest",
        "@types/node",
        "@types/node-notifier",
        "@types/winston",
        "ts-node",
        "typescript",
        "@types/cross-spawn"
    ],
    errorLogFilePatterns: [
        "npm-debug.log"
    ],
    validFiles: [
        ".DS_Store",
        "Thumbs.db",
        ".git",
        ".gitignore",
        ".idea",
        "README.md",
        "LICENSE",
        ".hg",
        ".hgignore",
        ".hgcheck",
        ".npmignore",
        "mkdocs.yml",
        "docs",
        ".travis.yml",
        ".gitlab-ci.yml",
        ".gitattributes"
    ],
    knownGeneratedFiles: [
        "package.json",
        "webpack.config.js",
        "tsconfig.json",
        "src",
        "resources",
        "launcher",
        "node_modules"
    ]
};

export default consts;
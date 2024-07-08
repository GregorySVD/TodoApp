export default {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "import"],
    extends: [
        "airbnb-base",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
        "prettier",
    ],
    env: {
        node: true,
    },
    rules: {
        quotes: ["error", "double", { avoidEscape: true }],
        semi: ["error", "always"],
        "no-console": "off",
        "import/prefer-default-export": "off",
        "lines-between-class-members": "off",
        "no-use-before-define": "off",
        "import/extensions": "off",
        "no-undef": "off",
    },
};

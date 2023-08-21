


module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import'],
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'prettier', // Add this line
    ],
    rules: {
        quotes: ['error', 'double', { avoidEscape: true }],
        'no-console': 'off',
        'import/prefer-default-export': 'off',
    },
};

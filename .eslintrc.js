module.exports = {
    "extends": "airbnb",
    env: {
        node: true,
        browser: true,
        es6: true,
        jest: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    parser:"babel-eslint",
    plugins: [ react ],
};
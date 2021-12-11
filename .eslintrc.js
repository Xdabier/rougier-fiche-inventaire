module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true
    },
    rules: {
        'global-require': 'off',
        'no-underscore-dangle': 'off'
    }
};

module.exports = {
    env: {
        node: true,
        es2022: true
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'no-useless-constructor': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never'
            }
        ]
    }
};

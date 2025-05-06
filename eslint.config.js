const { defineConfig } = require('eslint/config');
const js = require('@eslint/js');
const babelParser = require('@babel/eslint-parser');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const eslintConfigPrettier = require('eslint-config-prettier/flat');
const globals = require('globals');

module.exports = defineConfig(
    react.configs.flat.recommended,
    reactHooks.configs['recommended-latest'],
    js.configs.recommended,
    eslintConfigPrettier,
    {
        files: ['**/*.js', '**/*.jsx', './eslint.config.js'],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                },
                requireConfigFile: false
            },
            parser: babelParser,

            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.jest,
                beforeAll: true,
                describe: true,
                expect: true,
                global: true,
                insights: true,
                it: true,
                mount: true,
                process: true,
                render: true,
                shallow: true,
                React: true
            }
        },
        settings: {
            react: {
                version: '17.0'
            }
        },
        rules: {
            'no-console': 1,
            'array-bracket-spacing': 2,
            'comma-dangle': 2,
            'comma-spacing': [
                2,
                {
                    after: true
                }
            ],
            'comma-style': 2,
            curly: [
                'error',
                'all'
            ],
            'dot-notation': 2,
            'eol-last': 2,
            eqeqeq: 2,
            'func-names': [
                'error',
                'never'
            ],
            indent: [
                'error',
                4,
                {
                    SwitchCase: 1,
                    MemberExpression: 0,
                    ImportDeclaration: 1,
                    ObjectExpression: 1
                }
            ],
            'key-spacing': 2,
            'keyword-spacing': 2,
            'linebreak-style': [
                'error',
                'unix'
            ],
            'max-len': [
                2,
                150
            ],
            'new-cap': 2,
            'no-bitwise': 2,
            'no-caller': 2,
            'no-mixed-spaces-and-tabs': 2,
            'no-multiple-empty-lines': [
                'error',
                {
                    max: 1
                }
            ],
            'no-trailing-spaces': 2,
            'no-use-before-define': [
                'error',
                {
                    functions: false
                }
            ],
            'no-undef': 2,
            'no-unused-vars': 2,
            'no-var': 2,
            'no-with': 2,
            'object-shorthand': 2,
            'object-curly-spacing': [
                'error',
                'always'
            ],
            'one-var': [
                'error',
                'never'
            ],
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: 'block-like',
                    next: '*'
                }
            ],
            'quote-props': [
                'error',
                'as-needed'
            ],
            quotes: [
                'error',
                'single',
                {
                    allowTemplateLiterals: true
                }
            ],
            semi: [
                'error',
                'always'
            ],
            'space-before-blocks': 2,
            'space-in-parens': 2,
            'space-infix-ops': 2,
            'space-unary-ops': [
                'error',
                {
                    words: false,
                    nonwords: false
                }
            ],
            'vars-on-top': 2,
            'wrap-iife': 2,
            yoda: [
                'error',
                'never'
            ],
            'react-hooks/rules-of-hooks': [
                'error'
            ],
            'react-hooks/exhaustive-deps': [
                'warn'
            ]
        }
    });

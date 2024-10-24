import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import vuePlugin from 'eslint-plugin-vue';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';

export default [
    {
        ignores: ['src/components/icons/', 'src/api/']
    },
    eslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    {
        files: ['src/**/*.{js,ts,jsx,tsx,vue}'],
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.app.json'
                },
                node: {
                    project: './tsconfig.node.json'
                }
            }
        },
        languageOptions: {
            ecmaVersion: 'latest'
        },
        rules: {
            'import/order': ['warn'],
            'import/exports-last': ['warn'],
            'import/first': ['warn']
        }
    },
    ...tsEslint.configs.recommended,
    {
        files: ['src/**/*.{ts,tsx,vue}'],
        languageOptions: {
            parser: tsEslint.parser
        }
    },
    ...vuePlugin.configs['flat/recommended'],
    {
        files: ['src/**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsEslint.parser
            }
        },
        rules: {
            'vue/component-api-style': ['error', ['script-setup', 'composition']],
            'vue/block-lang': [
                'error',
                {
                    script: {
                        lang: 'ts'
                    }
                }
            ],
            'vue/attributes-order': [
                'error',
                {
                    alphabetical: true
                }
            ]
        }
    },
    prettierConfig
];

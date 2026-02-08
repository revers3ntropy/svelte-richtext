import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';











const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    prettier,
    ...svelte.configs.prettier,
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node }
        },
        rules: { 'no-undef': 'off' }
    },
    {
        files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
                svelteConfig
            }
        }
    },
    {
        rules: {
            // https://github.com/typescript-eslint/typescript-eslint/issues/2621
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    vars: 'all',
                    caughtErrors: 'none',
                    varsIgnorePattern: '^(_|[$][$])',
                    argsIgnorePattern: '^_'
                }
            ],
            //'prettier/prettier': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    disallowTypeAnnotations: false
                }
            ],
            // so I can do `while (true)`
            'no-constant-condition': 'off',
            // treats <script> tags as functions or something and complains
            // all functions are inner-ly declared
            'no-inner-declarations': 'off',
            // caught by other stuff and is too sensitive (e.g. `App`)
            'no-undef': 'off',
            // doesn't like namespaces for some reason
            // (see this: https://stackoverflow.com/questions/58270901)
            '@typescript-eslint/no-namespace': 'off',
            // just kinda useful sometimes
            '@typescript-eslint/no-empty-function': 'off',
            'svelte/no-navigation-without-resolve': 'off'
        }
    }
);

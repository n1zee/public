import { FlatCompat } from '@eslint/eslintrc';
import eslint_plugin_import from 'eslint-plugin-import';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    plugins: [eslint_plugin_import],
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        rules: {
            'react/jsx-curly-brace-presence': 2,
            '@typescript-eslint/no-explicit-any': 'off',
            'import/order': [
                'error',
                {
                    groups: [
                        ['builtin', 'external'],
                        ['internal'],
                        ['parent', 'sibling'],
                        ['index'],
                    ],
                    pathGroups: [
                        {
                            pattern: 'next/**',
                            group: 'builtin',
                        },
                        {
                            pattern: '@tanstack/**',
                            group: 'external',
                        },
                        {
                            pattern: '#api/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '#lib/**',
                            group: 'internal',
                        },
                        {
                            pattern: '#types/**',
                            group: 'internal',
                        },
                        {
                            pattern: '#hooks/**',
                            group: 'internal',
                        },
                        {
                            pattern: '#core/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '#components/**',
                            group: 'parent',
                            position: 'before',
                        },
                        {
                            pattern: '#layout/**',
                            group: 'parent',
                        },
                        {
                            pattern: '#ui/**',
                            group: 'parent',
                        },
                        {
                            pattern: '#assets/**',
                            group: 'index',
                        },
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },
];

export default eslintConfig;

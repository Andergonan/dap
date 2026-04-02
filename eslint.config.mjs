import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      /** quotes
       * Vynucuje pouziti jednoduchych uvozovek (' misto ").
       * Priklad:
       * [x] const a = "text";
       * [ok] const a = 'text';
       */
      quotes: ['error', 'single', { avoidEscape: true }],

      /** semi
       * Vyzaduje stredniky na konci prikazu.
       * Priklad:
       * [x] const a = 1
       * [ok] const a = 1;
       */
      semi: ['error', 'always'],

      /** comma-dangle
       * Zakazuje trailing carku na konci objektu/array.
       * Priklad:
       * [x] const arr = [1, 2,];
       * [ok] const arr = [1, 2];
       */
      'comma-dangle': ['error', 'never'],

      /** eqeqeq
       * Vynucuje striktni porovnani (=== misto ==).
       * Priklad:
       * [x] if (a == 1)
       * [ok] if (a === 1)
       */
      eqeqeq: ['error', 'always'],

      /** prefer-const
       * Pouzije const misto let, pokud se promenna nemeni.
       */
      'prefer-const': 'error',

      /** no-console
       * Zakazuje console.log, povoluje jen warn a error.
       */
      'no-console': ['error', { allow: ['warn', 'error'] }],

      /** react-hooks/rules-of-hooks
       * Kontroluje spravne pouziti React hooks (jen na top level, ne v podminkach).
       * Priklad:
       * [x] if (cond) useEffect(() => {});
       * [ok] useEffect(() => {});
       */
      'react-hooks/rules-of-hooks': 'error',

      /** @typescript-eslint/consistent-type-imports
       * Vynucuje oddeleni type importu.
       * Priklad:
       * [x] import { User } from './types';
       * [ok] import type { User } from './types';
       */
      '@typescript-eslint/consistent-type-imports': 'error',

      /** @typescript-eslint/no-unused-vars
       * Varuje pri nepouzitych promennych (ignoruje ty zacinajici _).
       */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' }
      ]
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts'
  ])
]);

export default eslintConfig;

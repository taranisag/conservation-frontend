module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['react', 'jsx-a11y', 'import', 'prettier', '@typescript-eslint'],
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    projectService: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['vite.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: ['vite.config.ts'],
          },
        ],
      },
    },
  ],
  rules: {
    'no-debugger': 2,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': "off",
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-interface': 'off',
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/prop-types': ['off', {}],
    '@typescript-eslint/class-name-casing': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'import/no-cycle': [2, { maxDepth: 1 }],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '{app/@components/**,app/@components,app/components/**,app/components}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{app/store/**,app/store,app/reducers,app/reducers/**}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '{app/services/**,app/services,app/utils,app/utils/**,@utils/,@utils/**,@services/,@services/**}',
            group: 'internal',
            position: 'after',
          },
        ],
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: ['block-like'], next: ['*'] },
      { blankLine: 'always', prev: ['*'], next: ['block-like'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

        // use <root>/path/to/folder/tsconfig.json
        project: './tsconfig.json',
      },
    },
  },
};

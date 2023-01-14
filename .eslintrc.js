module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: true,
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src',
          '@tests': './tests',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
      },
    },
  },
  ignorePatterns: ['**.json'],
  globals: {
    __APP_VERSION__: 'readonly',
  },
  rules: {
    'import/extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    // Allow console logging as we have no logger
    'no-console': 'warn',
    'no-void': 'off',
    'react/require-default-props': 'off'
  },
  overrides: [
    // Allow dev dependencies in the vite config
    {
      files: ['vite.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    },
    // Allow assigning to state in redux
    {
      files: ['src/store/**'],
      rules: {
        'no-param-reassign': 'off'
      }
    }
  ],
};

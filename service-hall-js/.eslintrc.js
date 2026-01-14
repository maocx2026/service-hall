const path = require('path');


module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue'],
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
		'eslint:recommended',
		'plugin:vue/vue3-strongly-recommended',
		'plugin:vue/vue3-recommended',
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
	],
  globals: {
    event: true,
    native: 'writeable',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // FIXME node/no-unsupported-features/es-syntax 在加入stylelint后，无法正确识别alias路径
    'node/no-unsupported-features/es-syntax': 'off',
    // FIXME node/no-missing-import 在加入stylelint后，无法正确识别alias路径
    'node/no-missing-import': 'off',
    'node/no-extraneous-import': 'off',
    'implicit-arrow-linebreak': ['error', 'beside'],
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'object-curly-newline': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['Vue', 'state'],
      },
    ],
    'linebreak-style': [0, 'error', 'windows'],
    'arrow-body-style': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          'window',
          '__INITIAL_STATE__',
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 0,
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: [],
      },
    ],
    'import/extensions': [
			'error',
			{
				'ts': 'never',
			},
    ],
    "no-shadow": "off",
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'vue/multi-word-component-names': 'off',
    'global-require': 0,
    'no-console': 'warn',
    'no-undef': 'off',
  },
};

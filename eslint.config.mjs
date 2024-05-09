import globals from 'globals'
import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin-js'


export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  {
    plugins: {
      stylistic
    },
    rules: {
      'stylistic/indent': [
        'error',
        2
      ],
      'stylistic/linebreak-style': [
        'error',
        'unix'
      ],
      'stylistic/quotes': [
        'error',
        'single'
      ],
      'stylistic/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0,
    }
  },
  {
    ignores: ['dist/*']
  }
]
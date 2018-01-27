const commonjs = require('rollup-plugin-commonjs');
const alias = require('rollup-plugin-alias');
const path = require('path');
const babel = require('rollup-plugin-babel');
const postcss = require('rollup-plugin-postcss');
const postcssImport = require('postcss-import');
const jscc = require('rollup-plugin-jscc');
const builtins = require('rollup-plugin-node-builtins');
const vue = require('rollup-plugin-vue');
const async = require('rollup-plugin-async');

module.exports = {
  input: 'src/app.js',
  output:
  { file: 'public/main.js'
  , format: 'iife'
  , sourcemap: true
  , strict: false
  },
  plugins:
  [ vue
    ({
      css: './public/vue.css'
    })
  , jscc
    ({
      values:
      {
        _DEBUG: process.env.DEBUG ? 1 : 0
      }
    })
  , alias
    ({
      '~node_modules': path.resolve(__dirname, 'node_modules') 
    })
  , builtins()
  , postcss
    ({
      sourceMap: true
    , extract: true
    , plugins:
      [
        postcssImport
        ({
          path: './src/css'
        })
      ]
    })
  ,  async()
  , commonjs
    ({
      namedExports:
      { 'node_modules/howler/dist/howler.js': ['howler']
      }
    })
  , babel
    ({
      exclude: 'node_modules/**'
    })
  ]
};
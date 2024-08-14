import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.js',
  output: [
    {
      file: 'dist/bundle.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'VueFormula',
      globals: {
        vue: 'Vue',
      },
    },
  ],
  plugins: [
    json(),
    resolve({
      browser: true,
      preferBuiltins: false,
      mainFields: ['module', 'main'], // 确保优先选择 ESM 格式
    }),
    commonjs({
      include: 'node_modules/**',
      dynamicRequireTargets: [
        // include here the paths that use dynamic require
        'node_modules/@formulajs/formulajs/lib/cjs/index.cjs',
      ],
    }),
    vue({
      compileTemplate: true,
      css: true,
    }),
    postcss(),
    terser(),
  ],
  external: ['vue'], // 将 Vue 作为外部依赖不打包进库中
};

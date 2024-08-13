import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only' // 引入 CSS 处理插件
import json from 'rollup-plugin-json'

export default {
  input: './src/index.js',
  plugins: [
    commonjs(),
    resolve({ extensions: ['.js', '.vue'] }),
    vue({
      compileTemplate: true, // 是否需要将 template 编译成 render 函数
      css: true, // 是否需要将样式提取到单独的文件，‌注意：‌这通常与 rollup-plugin-css-only 插件的功能冲突，‌所以这里可能设置为 false
    }),
    babel({
      exclude: '../node_modules/**',
      extensions: ['.js', '.vue'],
    }),
    json(),
    css({ output: 'bundle.css' }), // 将 CSS 提取到 bundle.css 文件中
  ],
  // 外部模块
  external: ['vue'],
  output: {
    // 输出配置，‌确保与你的需求相匹配
  },
}

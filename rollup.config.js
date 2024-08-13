// rollup.config.js
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js', // 应用的入口文件

  plugins: [
    babel({
      exclude: 'node_modules/**', // 防止打包 node_modules 中的文件
    }),
    vue({
      compileTemplate: true, // 是否需要将 template 编译成 render 函数
      css: true, // 是否需要将样式提取到单独的文件
    }),
    resolve(), // 用于解析 node_modules 中的模块
    commonjs(), // 将 CommonJS 模块转换为 ES2015 模块，以便 Rollup 可以处理它们
  ],
}

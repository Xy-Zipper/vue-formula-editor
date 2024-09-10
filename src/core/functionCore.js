import * as FormulaFunc from '@formulajs/formulajs'

class FunctionCore {
  constructor() {
    Object.assign(FunctionCore.prototype, FormulaFunc)
  }

  executeFunction(str) { // 执行函数
    const fn = new Function(
      'with(this) { return ' + str + '; }' // 使用 `with` 来确保从当前实例中查找函数
    ).bind(this)

    return fn()
  }
}
// 单例对象，保证全局只有一个实例
const functionCore = new FunctionCore()

export default functionCore

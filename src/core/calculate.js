import * as FormulaFunc from '@formulajs/formulajs'
/**
 * 计算公式
 * @param {text: string, marks: Array, value: Object} params
 * @returns
 */
function calculate(params) {
  const { text, marks = [], value = {} } = params

  if (!text) return new Error('非法公式')
  try {
    let str = text
    let offset = 0 // 偏移量
    marks.sort((a, b) => a.from.ch - b.from.ch)
    for (const mark of marks) {
      const { enCode, from, to, uuid } = mark

      let data = value[enCode] || value[uuid]
      // 子表情况
      if (enCode.indexOf('.') > -1) {
        const [key, subKey] = enCode.split('.')
        if (value[key]) data = value[key].map(o => o[subKey])
      }
      if (data !== undefined) {
        data = JSON.stringify(data)
        // 替换字符串的指定部分
        const startIndex = from.ch + offset
        const endIndex = to.ch + offset

        str = str.slice(0, startIndex) + data.toString() + str.slice(endIndex)

        // 更新偏移量
        offset += data.toString().length - (to.ch - from.ch)
      } else {
        return undefined
      }
    }
    // 创建一个新的函数作用域来执行 eval
    const result = new Function(...Object.keys(FormulaFunc), `return ${str};`)(
      ...Object.values(FormulaFunc)
    )
    return result
  } catch (e) {
    console.log(e)
    return undefined
  }
}

/**
 * 动态监听并返回计算结果
 * @param {VueContentInstance} vm 当前Vue实例
 * @param {Object} formData 计算公式所需的数据
 * @param {Object} formulaConf 计算公式配置
 * @param {Function} fn 回调函数
 */
function formulaWatcher(vm, formData, formulaConf, fn) {
  if (!formulaConf?.marks) return

  const toCalculate = () => {
    const data = calculate({
      value: formData,
      marks: formulaConf.marks,
      text: formulaConf.text,
    })
    if (data) fn(data)
  }
  formulaConf.marks.forEach(mark => {
    const [key] = mark.enCode.split('.')
    vm.$watch(`formData.${key}`, toCalculate)
  })
  // 初始化计算
  toCalculate()
}
export { calculate, formulaWatcher }

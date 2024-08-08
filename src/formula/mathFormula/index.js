// 数学函数
import BaseFormula from '../base'
import formula from './formula.json'

export default class MathFormula extends BaseFormula {
  constructor () {
    super({
      name: '数学函数',
      enCode: 'math',
      formula,
    })
  }
}

// 常用函数
import BaseFormula from '../base'
import formula from './formula.json'

export default class FrequentlyUse extends BaseFormula {
  constructor () {
    super({
      name: '常用函数',
      enCode: 'frequentlyUse',
      formula,
    })
  }
}

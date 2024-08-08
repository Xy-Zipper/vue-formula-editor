export default class BaseFormula {
  name = ''
  formula = []
  enCode = ''
  constructor (params) {
    const { name, formula, enCode } = params
    this.name = name
    this.formula = formula
    this.enCode = enCode
  }
}

import formulaObj from '../formula'
import * as FormulaFunc from '@formulajs/formulajs/lib/cjs/index.cjs'

export default class FormulaEditorCore {
  editor = null; // 编辑器实例
  formulaObjList = []; // 公式对象列表
  text = ''; // 公式文本
  marks = []; // 需替换的变量列表
  listen = ['change', 'inputRead', 'beforeChange']; // 监听方法

  constructor (editor, text = '') {
    this.editor = editor
    this.text = text
    this.initializeFormula()
  }

  // 获取公式列表
  getFormulaList () {
    return this.formulaObjList.flatMap(o => o.formula)
  }

  // 初始化公式对象
  initializeFormula () {
    formulaObj.forEach(ObjInstance => {
      this.formulaObjList.push(new ObjInstance())
    })
  }

  calculate (params) {
    const { text = this.text, marks = this.marks, value = {} } = params

    if (!text) return new Error('请输入公式')

    try {
      let str = text
      let offset = 0 // 偏移量
      marks.forEach(mark => {
        const { enCode, from, to } = mark
        const data = value[enCode]
        if (data !== undefined) {
          // 替换字符串的指定部分
          const startIndex = from.ch + offset
          const endIndex = to.ch + offset

          str = str.slice(0, startIndex) + data + str.slice(endIndex)

          // 更新偏移量
          offset += data.toString().length - (to.ch - from.ch)
        } else {
          throw new Error(`未找到${enCode}对应的值`)
        }
      })
      // 创建局部作用域并附加公式函数
      const localScope = {}
      for (const item of this.getFormulaList()) {
        localScope[item.name] = FormulaFunc[item.name]
      }
      // 创建一个新的函数作用域来执行 eval
      const result = new Function(...Object.keys(localScope), `return ${str};`)(
        ...Object.values(localScope)
      )
      return result
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  // 数据回显
  renderData (formulaData) {
    if (Object.keys(formulaData).length === 0) return

    this.editor.setValue(formulaData.text)
    this.marks = formulaData.marks
    this.marks.forEach(o => {
      this.editor.doc.markText(o.from, o.to, {
        className: 'cm-field',
        attributes: {
          'data-menuId': o.menuId,
          'data-enCode': o.enCode
        },
        atomic: true
      })
    })
  }

  // 注册监听器
  registerListen () {
    for (const item of this.listen) {
      const fn = this[`on${item.charAt(0).toUpperCase()}${item.slice(1)}`]
      this.editor.on(item, fn.bind(this, ...arguments))
    }
  }

  onInputRead (cm, change) {
    cm.showHint({
      hint: this.customHint.bind(this),
      completeSingle: false
    })
  }

  getData () {
    return {
      text: this.text,
      marks: this.marks
    }
  }

  reset () {
    this.editor.setValue('')
    this.text = ''
    this.marks = []
  }

  // 当编辑器中文本内容改变
  onChange (cm, changeObj) {
    this.marks = cm
      .getAllMarks()
      .filter(o => o.className === 'cm-field')
      .map(marks => {
        const { attributes } = marks
        return {
          ...marks.find(),
          enCode: attributes['data-enCode'],
          menuId: attributes['data-menuId']
        }
      })
    this.text = cm.getValue()
    if (changeObj.origin === 'complete') {
      // 向左移动一个字符
      this.moveCursor('left', 1)
    }
  }

  /**
   * 插入文本
   * @param {string | object} text
   * @param {'formula' | 'field'} type
   */
  insertText (data, type) {
    const cursor = this.editor.getCursor()

    this.editor.replaceRange(
      type === 'field' ? JSON.stringify(data) : data,
      cursor
    )
    type === 'formula' && this.moveCursor('left', 1)
    this.editor.focus()
  }

  /**
   *
   * @param {'left' | 'right' | 'up' | 'down'} direction 方向
   * @param {number} step 步长
   */
  moveCursor (direction, step) {
    const cursor = this.editor.getCursor()
    const line = cursor.line
    const ch = cursor.ch

    // 检查是否已经在行首
    if (direction === 'left') {
      // 如果不是行首，则向左移动字符
      this.editor.setCursor({ line: line, ch: ch - step })
    } else if (direction === 'right') {
      // 如果是行首，则向右移动字符
      this.editor.setCursor({ line: line, ch: ch + step })
    } else if (direction === 'up') {
      // 如果是行首，则向上移动行
      this.editor.setCursor({ line: line - step, ch: ch })
    } else if (direction === 'down') {
      // 如果是行首，则向下移动行
      this.editor.setCursor({ line: line + step, ch: ch })
    }
  }

  onBeforeChange (cm, changeObj) {
    const { text, from, cancel } = changeObj
    const data = this.matchField(text[0])
    if (data.length) {
      cancel()
      const field = JSON.parse(data[0])
      const fieldFrom = { ...from }
      const to = { ...from, ch: from.ch + field.fullName.length }
      cm.replaceRange(field.fullName, fieldFrom)
      cm.doc.markText(fieldFrom, to, {
        className: 'cm-field',
        attributes: {
          'data-menuId': field.menuId,
          'data-enCode': field.enCode
        },
        atomic: true
      })
    }
  }

  // 匹配字段
  matchField (text) {
    const regex = /\{[^}]+\}/g
    return text.match(regex) || []
  }

  // 匹配当前行的公式
  matchWord (text) {
    // 使用正则表达式提取出字母部分
    const match = text.match(/[a-zA-Z]+$/)
    return match ? match[0] : ''
  }

  // 匹配当前行的公式
  matchFormula (text) {
    if (!text) return false

    const suggestions = this.getFormulaList()
    const match = suggestions.find(o => o.name === text)
    return match
  }

  // 自定义提示函数
  customHint (cm) {
    // 游标
    const cursor = cm.getCursor()
    // 当前行文本
    const currentLineText = cm.getLine(cursor.line)
    const matchWords = this.matchWord(currentLineText)
    const start = cursor.ch
    const suggestions = this.getFormulaList()
    const result = {
      list: suggestions
        .map(o => ({ text: `${o.name}()`, displayText: o.name, tip: o.tip }))
        .filter(
          suggestion =>
            matchWords &&
            suggestion.text.toLowerCase().includes(matchWords.toLowerCase())
        )
        .map(suggestion => {
          const text = suggestion.displayText
          const matchIndex = text
            .toLowerCase()
            .indexOf(matchWords.toLowerCase())
          suggestion.render = function (element, self, data) {
            if (matchIndex >= 0) {
              const beforeMatch = text.slice(0, matchIndex)
              const match = text.slice(
                matchIndex,
                matchIndex + matchWords.length
              )
              const afterMatch = text.slice(matchIndex + matchWords.length)

              const span = document.createElement('span')

              if (beforeMatch) {
                span.appendChild(document.createTextNode(beforeMatch))
              }

              const highlight = document.createElement('span')
              highlight.textContent = match
              highlight.style.fontWeight = 'bold'
              highlight.style.color = '#ff0000'
              span.appendChild(highlight)

              if (afterMatch) {
                span.appendChild(document.createTextNode(afterMatch))
              }

              element.appendChild(span)
            } else {
              element.appendChild(document.createTextNode(text))
            }
          }

          return suggestion
        }),
      from: { line: cursor.line, ch: start - matchWords.length },
      to: { line: cursor.line, ch: start }
    }
    return result
  }
}

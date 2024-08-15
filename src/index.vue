<template>
  <div class="vue-formula">
    <codemirror @ready="onCmReady" v-model="code" :options="options" />
    <div class="operator-container">
      <FieldVariable
        class="field-variable"
        @fieldSelect="onFieldSelect"
        :fieldList="fieldList" />
      <FormulaList
        :nodes="nodes"
        class="formula-list"
        @formulaClick="onFormulaClick" />
      <div v-if="currentFormula" class="formula-info">
        <div class="info-text">{{ currentFormula.tip }}</div>
        <div class="info-text">用法：{{ currentFormula.usage }}</div>

        <div class="info-text">示例：{{ currentFormula.example }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  // 组件样式
  import 'codemirror/lib/codemirror.css'
  // 主题
  import 'codemirror/theme/3024-day.css'
  import 'codemirror/theme/ayu-mirage.css'
  import 'codemirror/theme/monokai.css'
  // 语言模式
  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/addon/hint/show-hint.css'
  import 'codemirror/addon/hint/show-hint.js'
  import { codemirror } from 'vue-codemirror'
  import FormulaEditorCore from './core/index'
  import FieldVariable from './components/FieldVariable.vue'
  import FormulaList from './components/FormulaList.vue'
  export default {
    name: 'vue-formula',
    provide() {
      return {
        getEditorCore: () => this.editorCore,
      }
    },
    components: {
      codemirror,
      FieldVariable,
      FormulaList,
    },
    props: {
      fieldList: {
        type: Array,
        default: () => [],
      },
      formulaList: {
        type: Array,
        default: () => [],
      },
      formulaConf: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        editorCore: null,
        code: '',
        currentFormula: null,
        options: {
          autofocus: true,
          line: true,
          height: 200,
          theme: '3024-day', // 主题
          tabSize: 4, // 制表符的宽度
          readOnly: false, // 只读
          autorefresh: false,
          smartIndent: true, // 上下文缩进
          lineNumbers: false, // 是否显示行号
          styleActiveLine: true, // 高亮选中行
          showCursorWhenSelecting: true, // 当选择处于活动状态时是否应绘制游标
        },
      }
    },
    computed: {
      nodes() {
        return this.formulaList || []
      },
    },
    watch: {},
    methods: {
      renderData() {
        this.editorCore.renderData(this.formulaConf)
      },
      reset() {
        this.currentFormula = null
        this.editorCore.reset()
      },
      getData() {
        return this.editorCore.getData()
      },
      onCmReady(codemirror) {
        this.editorCore = new FormulaEditorCore(
          codemirror,
          '',
          this.formulaList
        )
        this.editorCore.registerListen()

        this.editorCore.renderData(this.formulaConf)
      },

      onFormulaClick(formula) {
        this.currentFormula = formula
        this.editorCore.insertText(`${formula.name}()`, 'formula')
      },
      onFieldSelect(field) {
        this.editorCore.insertText(
          {
            ...field,
            menuId: this.currentMenuId,
          },
          'field'
        )
      },
    },
    created() {},
    mounted() {},
  }
</script>
<style lang="less" scoped>
  .vue-formula {
    .operator-container {
      display: flex;
      flex: 1;
      overflow: hidden;
      .field-variable {
        height: 100%;
        width: 250px;
      }
      .formula-list {
        height: 100%;
        width: 220px;
      }
      .formula-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 6px;
        .info-text {
          font-size: 12px;
          color: #6b7280;
          margin: 6px 0;
        }
      }
    }
  }
</style>

<style>
  .vue-formula {
    border: 1px solid #d7d9dc;
    height: fit-content;
    margin-top: 10px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    height: 500px;
    .CodeMirror {
      height: 200px;
    }
  }

  .CodeMirror-hints {
    z-index: 30000 !important;
    background-color: #f0f0f0;
    color: #333;
    width: 130px;
    font-size: 14px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
  }
  .cm-field {
    background: #eaf2fd;
    color: #2f7deb !important;
    border-radius: 2px;
    display: inline-block;
    font-size: 14px;
    margin: 0 2px;
    padding: 3px 5px;
  }
</style>

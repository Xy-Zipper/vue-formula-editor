<template>
  <div class="vue-formula">
    <codemirror @ready="onCmReady" v-model="code" :options="options" />
    <div class="operator-container flex flex-1 overflow-hidden">
      <FieldVariable
        class="h-full w-[250px]"
        @fieldSelect="onFieldSelect"
        :fieldList="fieldList" />
      <FormulaList class="h-full w-[220px]" @formulaClick="onFormulaClick" />
      <div v-if="currentFormula" class="flex-1 flex flex-col p-2">
        <div class="text-sm text-gray-500">{{ currentFormula.tip }}</div>
        <div class="text-sm text-gray-500 my-4">
          用法：{{ currentFormula.usage }}
        </div>

        <div class="text-sm text-gray-500">
          示例：{{ currentFormula.example }}
        </div>
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
//   import {codemirror}  from 'vue-codemirror'
  import FormulaEditorCore from './core/index'
  import FieldVariable from './components/FieldVariable.vue'
import FormulaList from './components/FormulaList.vue'
  const {codemirror} = require('vue-codemirror')
  export default {
    name: 'vue-formula',
    components: {
      codemirror,
      FieldVariable,
      FormulaList,
    },
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        fieldList: [],
        loading: true,
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
    computed: {},
    watch: {},
    methods: {
      onCmReady(codemirror) {
        this.editorCore = new FormulaEditorCore(codemirror)
        this.editorCore.registerListen()
      },
    },
    created() {},
    mounted() {},
  }
</script>
<style lang="scss" scoped></style>

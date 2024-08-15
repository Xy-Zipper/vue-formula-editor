<template>
  <div id="app">
    <el-button type="text" @click="dialogVisible = true">配置公式</el-button>
    <el-form ref="form" :model="formData">
      <el-form-item label="名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="formData.desc"></el-input>
      </el-form-item>
    </el-form>
    <div>计算结果：{{ result }}</div>
    <el-dialog title="配置公式" :visible.sync="dialogVisible" width="80%">
      <FormulaEditor
        :formulaList="list"
        ref="formulaEditor"
        :formulaConf="formulaConf"
        :loading="true"
        :fieldList="fieldList"></FormulaEditor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import FormulaEditor from '../../src/index'
  import formulaObj from './formula'
  import { calculate, formulaWatcher } from '../../src/core/calculate'

  export default {
    name: 'HomeView',
    components: {
      FormulaEditor,
    },
    data() {
      return {
        dialogVisible: false,
        formData: {
          name: '',
          desc: '',
        },
        result: '',
        list: [],
        formulaConf: {},
        watchData: null,
        fieldList: [
          {
            fullName: '名称',
            value: 'string',
            enCode: 'name',
          },
          {
            fullName: '描述',
            value: 'string',
            enCode: 'desc',
          },
        ],
      }
    },
    computed: {
      nodes() {
        return this.list?.flatMap(o => o.formula) || []
      },
    },
    mounted() {
      this.list = formulaObj.map(ObjInstance => new ObjInstance())
      // 计算值 - 传入配置
      this.result = calculate({
        text: 'SUM(1,2,3,4,5,6,7,8,9,10)',
      })
    },
    methods: {
      onConfirm() {
        const data = this.$refs.formulaEditor.getData()
        this.formulaConf = data
        this.dialogVisible = false
        this.watchData?.()
        // 自动监听form表单的值
        this.watchData = formulaWatcher(
          this,
          { key: 'formData', value: this.formData },
          this.formulaConf,
          data => {
            this.result = data
          }
        )
      },
      onCancel() {
        this.dialogVisible = false
      },
      resetFormula() {
        this.$refs.formulaEditor.reset()
      },
    },
  }
</script>

<style></style>

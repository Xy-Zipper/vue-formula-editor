<template>
  <div id="app">
    <el-button type="text" @click="dialogVisible = true">配置公式</el-button>
    <el-dialog title="配置公式" :visible.sync="dialogVisible" width="80%">
      <FormulaEditor
        :formulaList="list"
        :loading="true"
        :fieldList="fieldList"></FormulaEditor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import FormulaEditor from '../../src/index'
  import formulaObj from './formula'

  export default {
    name: 'HomeView',
    components: {
      FormulaEditor,
    },
    data() {
      return {
        dialogVisible: false,
        list: [],
        fieldList: [
          {
            fullName: '姓名',
            value: 'string',
            enCode: 'name',
          },
          {
            fullName: '姓名2',
            value: 'string',
            enCode: 'name2',
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
      console.log('list', this.list)
    },
  }
</script>

<style></style>

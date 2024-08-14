<template>
  <div id="app">
    <el-button type="text" @click="dialogVisible = true">
      配置公式
    </el-button>
    <el-dialog
      title="配置公式"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
      <FormulaEditor :loading="true" :fieldList="fieldList"></FormulaEditor>
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
  export default {
    name: 'HomeView',
    components: {
      FormulaEditor,
    },
    data() {
      return {
        dialogVisible: false,
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
  }
</script>

<style></style>

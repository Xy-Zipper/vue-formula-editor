<template>
  <div class="formula-list">
    <Tree
      :data="nodes"
      :default-expanded-keys="['frequentlyUse']"
      :props="defaultProps"
      node-key="enCode"
      @node-click="nodeClick">
      <span class="info-container" slot-scope="{ data }">
        <span>{{ data.name }}</span>
        <span v-if="data.tip" class="tip">
          {{ data.tip }}
        </span>
      </span>
    </Tree>
  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css'
  import { Tree } from 'element-ui'

  export default {
    name: 'FormulaList',
    components: { Tree },
    inject: ['getEditorCore'],
    data() {
      return {
        editorCore: null,
        defaultProps: {
          children: 'formula',
          label: 'name',
        },
      }
    },
    computed: {
      nodes() {
        return this.editorCore?.formulaObjList || []
      },
    },
    watch: {},
    methods: {
      nodeClick(o) {
        if (o.formula) return
        this.$emit('formulaClick', o)
      },
    },
    created() {},
    mounted() {
      this.editorCore = this.getEditorCore()
    },
  }
</script>
<style lang="less" scoped>
  .formula-list {
    padding: 0 10px;
    overflow: auto;
    height: 100%;
    border-right: 1px solid #d7d9dc;
    .info-container {
      display: flex;
      flex-direction: column;
    }
    ::v-deep .el-tree-node__content {
      height: 100%;
      margin-top: 6px;
      padding: 6px 0;
      user-select: none;
    }
    .tip {
      font-size: 12px;
      color: #999;
      margin-top: 1px;
      line-height: 1.2;
    }
  }
</style>

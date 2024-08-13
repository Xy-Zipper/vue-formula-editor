<template>
  <div class="formula-list">
    <el-tree
      :data="nodes"
      :default-expanded-keys="['frequentlyUse']"
      :props="defaultProps"
      node-key="enCode"
      @node-click="nodeClick">
      <span class="flex flex-col" slot-scope="{ data }">
        <span>{{ data.name }}</span>
        <span v-if="data.tip" class="text-[#999] text-xs mt-1">
          {{ data.tip }}
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "FormulaList",
  components: {},
  inject: ["getEditorCore"],
  data() {
    return {
      editorCore: null,
      defaultProps: {
        children: "formula",
        label: "name",
      },
    };
  },
  computed: {
    nodes() {
      return this.editorCore?.formulaObjList || [];
    },
  },
  watch: {},
  methods: {
    nodeClick(o) {
      if (o.formula) return;
      this.$emit("formulaClick", o);
    },
  },
  created() {},
  mounted() {
    this.editorCore = this.getEditorCore();
  },
};
</script>
<style lang="scss" scoped>
.formula-list {
  padding: 10px;
  overflow: auto;
  height: 100%;
  border-right: 1px solid #d7d9dc;
  ::v-deep .el-tree-node__content {
    height: 100%;
    margin-top: 6px;
    padding: 6px 0;
    user-select: none;
  }
}
</style>

<template>
  <div class="formula-list">
    <el-input
    placeholder='搜索函数'
    prefix-icon="el-icon-search"
    v-model="searchTreeVariable" 
    clearable
    ></el-input>
    <div class="treeContainer" @mouseleave="leaveTree" >
      <Tree
      :data="filterData"
      :default-expanded-keys="['frequentlyUse']"
      :props="props"
      :current-node-key="currentKeyNode.enCode"
      node-key="enCode"
      @node-click="nodeClick"
      highlight-current
            
      >
      <span class="info-container" @mouseenter="enterInfo(data)"  slot-scope="{ data }">
        <span>{{ data.name }}</span>
        <span v-if="data.tip" class="tip">
          {{ data.tip }}
        </span>
      </span>
    </Tree>
    </div>

  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css'
  import { Tree } from 'element-ui'

  export default {
    name: 'FormulaList',
    components: { Tree },
    props: {
      nodes: {
        type: Array,
        default: () => [],
      },
      props: {
        type: Object,
        default: () => ({
          children: 'formula',
          label: 'name',
        }),
      },
    },
    data() {
      return {
        searchTreeVariable:"",
        // 选中的节点
        currentKeyNode:{},
      }
    },
    computed: {
      filterData() {
        if(!this.searchTreeVariable){
          return this.nodes
        }
        return this.filterTreeData(this.nodes)
      },
    },
    watch: {},
    methods: {
      nodeClick(o) {
        const currentKeyNode = this.currentKeyNode
        // 目录情况
        if (o.formula){
          if(currentKeyNode && currentKeyNode.enCode ){
            this.currentKeyNode={}
          }
          return
        }
        this.currentKeyNode = o
        this.$emit('formulaClick', o)
      },
      filterTreeData(nodes) {
        // 找到nodes树中包含searchTreeVariable的节点但只有一层的结果
        return nodes.reduce((pre,cur)=>{
          if(cur.name.toLowerCase().includes(this.searchTreeVariable)){
            pre.push({...cur})
          }
          if(cur.formula){
            pre.push(...this.filterTreeData(cur.formula))
          }
          return pre
        },[])
      },
      enterInfo(data) {
        if(data.formula) return 
        this.$emit('enterInfo', data)
      },
      leaveTree(){
        if(this.currentKeyNode && this.currentKeyNode.enCode){
          this.$emit('enterInfo', this.currentKeyNode)
        }
      }
    },
    created() {},
    mounted() {},
  }
</script>
<style lang="less" scoped>
  .formula-list {
    padding: 0 10px;
    overflow: auto;
    height: 100%;
    border-right: 1px solid #d7d9dc;
    .info-container {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    ::v-deep .el-tree-node__content {
      height: 100%;
      // margin-top: 6px;
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

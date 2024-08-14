<template>
  <div class="field-variable">
    <div
      class="field-item"
      @click="$emit('fieldSelect', item)"
      v-for="item in fieldList"
      :key="item.enCode">
      <span>{{ item.fullName }}</span>
      <span :field-type="item.value" class="text-tag">
        {{ type[item.value] }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FieldVariable',
    props: {
      fieldList: {
        type: Array,
        default: () => [],
      },
    },
    components: {},
    data() {
      const type = {
        string: '字符串',
        number: '数字',
        array: '数组',
      }
      return {
        type,
      }
    },
    computed: {},
    watch: {},
    methods: {},
    async created() {},
    mounted() {},
  }
</script>
<style lang="less" scoped>
  .field-variable {
    max-width: 255px;
    padding: 10px;
    overflow: auto;
    height: 100%;
    border-right: 1px solid #d7d9dc;
    .field-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      cursor: pointer;
      padding: 8px;
      user-select: none;
      &:hover {
        background-color: #f0f1f4;
      }
      .text-tag {
        padding: 2px 6px;
        border-radius: 4px;
        color: #fff;
        &[field-type='string'] {
          color: #409eff;
          background-color: #ecf5ff;
        }
        &[field-type='number'] {
          color: #67c23a;
          background-color: #f0f9eb;
        }
        &[field-type='array'] {
          color: #e6a23c;
          background-color: #fdf6ec;
        }
      }
    }
  }
</style>

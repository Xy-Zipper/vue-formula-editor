<template>
  <div class="vue-formula">
    <codemirror @ready="onCmReady" v-model="code" :options="options" />
  </div>
</template>

<script>
// 组件样式
import "codemirror/lib/codemirror.css";
// 主题
import "codemirror/theme/3024-day.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/theme/monokai.css";
// 语言模式
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";

import { codemirror } from "vue-codemirror";
import FormulaEditorCore from "./core/index";
export default {
  name: "vue-formula",
  components: {},
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>

<template>
  <div id="app"> 
    <FormulaEditor :loading="true"></FormulaEditor>
  </div>
</template>
<script> 
  import FormulaEditor from 'vue-formula'
  export default {
    name: 'HomeView',
    components: {
      FormulaEditor,
    },
  }
</script>

<style></style>

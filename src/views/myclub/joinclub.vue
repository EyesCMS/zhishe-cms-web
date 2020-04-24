<template>
  <div style="margin-top: 15px;text-align:center;">
    <el-input v-model="input" placeholder="请输入内容" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" />
    </el-input>
  </div>
</template>

<style>
  .el-input {
    width: 600px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>

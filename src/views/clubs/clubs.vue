<template>
<div style="margin-top: 15px;text-align:center;">
  <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="社团名字" value="1"></el-option>
      <el-option label="社团id" value="2"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
  <el-button type="primary">创建社团</el-button>
</div>

</template>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      select: ''
    }
  }
}
</script>


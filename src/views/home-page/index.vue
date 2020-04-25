<template>
  <div>
    <el-button
      type="primary"
      @click="chief"
    >切换到chief</el-button>
    <el-button
      type="primary"
      @click="menber"
    >切换到clunMenber</el-button>
    <el-button
      type="primary"
      @click="student"
    >切换到student</el-button>
    <el-button
      type="primary"
      @click="admin"
    >切换到admin</el-button>
    <el-button
      type="primary"
      @click="normal"
    >切换到normal</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    chief: function () {
      this.$store.dispatch('user/changeRoles', 'chief')
    },
    admin: function () {
      this.$store.dispatch('user/changeRoles', 'admin')
    },
    normal: function () {
      this.$store.dispatch('user/changeRoles', 'normal')
    },
    student: function () {
      this.$store.dispatch('user/changeRoles', 'student')
    },
    menber: function () {
      this.$store.dispatch('user/changeRoles', 'menber')
    }
  }
}
</script>

<style lang="stylus" scoped></style>

<template>
  <div>
    home组件
  </div>
</template>

<script>
export default {
  mounted: function () {
    console.log(this.$store.getters)
  }
}
</script>

<style lang="stylus" scoped></style>

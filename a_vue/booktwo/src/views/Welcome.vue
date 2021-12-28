<template>
  <div>
    引导页
  </div>
</template>

<script>
export default {
  name: "Welcome",
  created() {
    setTimeout(()=>{
      this.$router.push({path:'index'})
    },3000)
  }

}
</script>

<style scoped>

</style>
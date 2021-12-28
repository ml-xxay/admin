<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app",
  components: {},
};
</script>


<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: white;
}
.el-card {
  margin-top: 50px;
}
.a {
  text-align: center;
}
</style>

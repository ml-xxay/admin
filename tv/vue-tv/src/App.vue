<template>
  <div id="app">
    <main-tab-bar />
    <keep-alive :exclude="['CourseInfo']">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import MainTabBar from "./components/content/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
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
}
</style>

<template>
  <div id="app">
    <keep-alive include="report">
      <router-view />
    </keep-alive>
  </div>
</template>
<style lang="less">
@import 'global';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgba(248, 248, 248, 1);
  color: #2c3e50;
  height: 100%;
  width: 100%;
  font-size: 16px;
  /* margin-bottom: 65px; */
}
</style>
<script>
export default {};
</script>

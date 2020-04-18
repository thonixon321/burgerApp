<template>
  <div id="app">
    <!-- the key here makes sure components get reloaded when the url changes, including query params -->
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>


export default {
  components: {

  }
}
</script>

<style>
html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  background: #f5f3f3;
}
#app {
  box-sizing: border-box;
  width: 900px;
  padding: 0 20px 20px;
  margin: 0 auto;
}

</style>

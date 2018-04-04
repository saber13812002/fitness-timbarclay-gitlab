<template>
  <el-container class="container">
    <el-aside>
      <router-link to="/"><h1>Fitness</h1></router-link>
      <side-bar/>
    </el-aside>
    
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import SideBar from "./components/sidebar/SideBar.vue";

export default {
  components: {
    SideBar
  }
}
</script>


<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}
.container {
  min-height: 100vh;
}
</style>

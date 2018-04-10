<template>
  <el-container class="container">
    <el-header>
      <navbar :light="light" />
    </el-header>
    
    <el-main>
      <router-view/>
    </el-main>

    <el-footer>
      
    </el-footer>
  </el-container>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";

export default {
  components: {
    Navbar
  },
  computed: {
    light() {
      return this.$route.name === "login";
    }
  }
}
</script>

<style lang="scss">
@import "./sass/_variables.scss";

html, body {
  margin: 0;
  padding: 0;
}
.container {
  min-height: 100vh;
}
.el-main {
  padding: 0;
  margin-top: -$nav-height;
  min-height: 100vh;
}
.el-header {
  z-index: 10;
}
.el-footer {
  background-color: $primary-text;
  color: $light-border;
}
</style>

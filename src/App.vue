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
import {mapState} from "vuex";


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

header.el-header {
  background-color: $white;
  @include drop-shadow;
}
.container {
  min-height: 100vh;
}
main.el-main {
  background-color: $neutral;
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

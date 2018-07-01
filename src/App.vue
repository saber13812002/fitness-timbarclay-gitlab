<template>
  <el-container class="container">
    <el-header :class="{light: isLogin}">
      <navbar :hide-login="isLogin"/>
    </el-header>
    
    <el-main :class="{pushed: !isLogin}">
      <router-view v-if="!isLoggedIn"/>
      
      <with-sidebar v-else>
        <router-view/>
      </with-sidebar>
    </el-main>

    <el-footer style="height: inherit">
      <app-footer/>
    </el-footer>
  </el-container>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";
import AppFooter from "./components/navbar/AppFooter.vue";
import WithSidebar from "./components/WithSidebar.vue";
import {mapGetters} from "vuex";

export default {
  components: {
    Navbar,
    AppFooter,
    WithSidebar
  },
  computed: {
    ...mapGetters([
      "isLoggedIn"
    ]),
    isLogin() {
      return this.$route.name === "login";
    }
  }
}
</script>

<style lang="scss">
@import "./sass/_variables.scss";

header.el-header {
  background-color: $primary-brand;
  z-index: 10;
  transition: background-color 0.5s, color 0.5s, text-shadow 0.5s;
  color: $white;
  .brand {
    color: $white;
  }
  &.light {
    background-color: transparent;
  }
}
.container {
  min-height: 100vh;
}
main.el-main {
  padding: 0;
  margin-top: -$nav-height;
  &.pushed {
    padding-top: calc(#{$nav-height} + #{$normal-space});
  }
}
.el-footer {
  background-color: $primary-text;
  color: $light-border;
}
@media only screen and (max-width: 990px) {
  header.el-header {
    padding: 0 $small-space;
  }
  main.el-main.pushed {
    padding-top: $nav-height;
  }
}
</style>

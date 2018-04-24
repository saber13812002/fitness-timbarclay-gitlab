<template>
  <el-container class="container">
    <el-header>
      <navbar :light="isLogin" />
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
  &.pushed {
    padding-top: calc(#{$nav-height} + #{$normal-space});
  }
}
.el-header {
  z-index: 10;
}
.el-footer {
  background-color: $primary-text;
  color: $light-border;
}
@media only screen and (max-width: 990px) {
  main.el-main.pushed {
    padding-top: $nav-height;
  }
}
</style>

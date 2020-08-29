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
import {MessageBox} from 'element-ui';
import {mapGetters} from "vuex";

export default {
  components: {
    Navbar,
    AppFooter,
    WithSidebar
  },
  data() {
    return {
      registration: null,
      updateExists: false,
      refreshing: false
    }
  },
  created() {
    document.addEventListener('swUpdated', this.updateAvailable, { once: true })
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      // Reload the page to pick up the newly installed version
      window.location.reload()
    })
  },
  computed: {
    ...mapGetters([
      "isLoggedIn"
    ]),
    isLogin() {
      return this.$route.name === "login";
    }
  },
  methods: {
    updateAvailable(event) {
      this.registration = event.detail
      this.updateExists = true

      MessageBox.alert('An update has been installed. Press update to use the new version', 'Update available', {
        confirmButtonText: 'Update',
        showClose: false,
        callback: () => {
          this.refreshApp()
        }
      });
    },
    refreshApp() {
      this.updateExists = false
      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return
      // Send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
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
.el-message-box {
  max-width: 100%;
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

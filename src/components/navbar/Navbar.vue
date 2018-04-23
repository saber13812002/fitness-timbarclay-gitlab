<template>
  <nav :class="{light: light}">
    <div class="nav-group">
      <router-link class="title-link" to="/sessions"><h1 class="brand">Fitness</h1></router-link>
    </div>

    <div class="nav-group">
      <!-- <router-link to="/about">About</router-link> -->
      <login-container/>
    </div>
  </nav>
</template>

<script>
import LoginContainer from "../login/LoginContainer.vue";

export default {
  props: {
    light: {type: Boolean, default: false}
  },
  components: {
    LoginContainer
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";

nav {
  display: flex;
  height: $nav-height;
  justify-content: space-between;

  h1 {
    display: inline;
    font-size: 1.6em;
  }

  a {
    text-decoration: none;
    color: $regular-text;
    display: inline-block;
    height: $nav-height;
    line-height: $nav-height;
    padding: 0 1.5em;
    margin: 0 1em;
    transition: background-color 0.5s;

    &:not(.title-link) {
      &:hover {
        background-color: rgba($light-border, .4);
      }

      &.router-link-exact-active {
        border-bottom: $light-border solid 1px;
      }
    }
  }

  .nav-group {
    display: flex;
    align-items: center;
  }

  &.light {
    a {
      color: $lighter-border;
    }
  }
}

@media only screen and (max-width: 990px) {
  nav a {
    padding: 0 4px;
    margin: 0;
  }
}
</style>

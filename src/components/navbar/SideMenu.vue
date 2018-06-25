<template>
  <div>
    <!-- TODO: there must be a better way to show a horizontal menu on small screens -->
    <el-menu class="hidden-sm-and-down" :router="true" :default-active="active">
      <el-menu-item index="/sessions">Sessions</el-menu-item>
      <el-menu-item index="/exercises">Exercises</el-menu-item>
      <el-menu-item index="/calculator">Intensity Calculator</el-menu-item>
      <el-menu-item index="/settings">Settings</el-menu-item>
    </el-menu>

    <el-menu class="hidden-md-and-up" mode="horizontal" :router="true" :default-active="active">
      <el-menu-item index="/sessions">Sessions</el-menu-item>
      <el-menu-item index="/exercises">Exercises</el-menu-item>
      <el-menu-item index="/calculator">Calculator</el-menu-item>
      <el-menu-item index="/settings">Settings</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  computed: {
    active() {
      const firstPath = this.$route.path.split("/")[1] || "";
      return `/${firstPath}`;
    }
  }
}
</script>

<style lang="scss">
@import "../../sass/variables";

ul.el-menu {
  background-color: inherit;
  border-right-color: $base-border;
  li.el-menu-item {
    font-size: 0.8em;
    padding: 0 10px;
    font-family: $poppins;
  }
}

@media only screen and (min-width: 990px) {
  ul.el-menu li.el-menu-item {
    font-size: 1.3em;
    border-left: solid 1px transparent;
    &.is-active {
      border-color: $primary-brand;
    }
    &:hover {
      border-color: rgba($primary-brand, 0.6);
      background-color: transparent;
      color: rgba($primary-brand, 0.6);
    }
    &:focus {
      background-color: transparent;
    }
  }
}
</style>

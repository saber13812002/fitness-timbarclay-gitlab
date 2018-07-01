<template>
  <div class="page-menu">
    <el-menu mode="horizontal" :router="true" :default-active="active">
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

.page-menu {
  background-color: $primary-brand;
  margin-top: -1px;
}
ul.el-menu {
  background-color: inherit;
  border-right: 0;
  li.el-menu-item:not(.is-disabled) {
    color: $lighter-border;
    font-size: 0.9em;
    padding: 0 10px;
    border-width: 4px;
    height: 2.5em;
    line-height: 2em;
    &.is-active {
      color: $white;
      border-color: $white;
    }
    &:focus {
      color: $white;
      background-color: inherit;
    }
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

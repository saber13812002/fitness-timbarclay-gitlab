<template>
  <div>
    <!-- TODO: there must be a better way to show a horizontal menu on small screens -->
    <el-menu class="hidden-sm-and-down" :router="true" :default-active="active">
      <el-menu-item index="/sessions">Sessions</el-menu-item>
      <el-menu-item index="/exercises">Exercises</el-menu-item>
    </el-menu>

    <el-menu class="hidden-md-and-up" mode="horizontal" :router="true" :default-active="active">
      <el-menu-item index="/sessions">Sessions</el-menu-item>
      <el-menu-item index="/exercises">Exercises</el-menu-item>
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

<style>

</style>

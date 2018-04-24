<template>
  <el-row class="home content-section">
    <el-col :xs="24" :md="6" class="sidebar">
      <side-menu/>
    </el-col>
    <el-col :xs="24" :md="18" class="main-content">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script>
import SideMenu from "../components/navbar/SideMenu.vue";

export default {
  components: {
    SideMenu
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";

.sidebar {
  padding: $normal-space;
}
.main-content {
  padding: $normal-space $normal-space ($normal-space * 2) $normal-space;
  position: relative;
}
@media only screen and (max-width: 990px) {
  .home {
    font-size: 0.9em;
    margin-top: 0;
  }
  .sidebar {
    padding: 0;
  }
  .main-content {
    padding: $small-space $small-space $normal-space $small-space;
  }
}
</style>


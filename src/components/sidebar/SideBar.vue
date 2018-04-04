<template>
  <nav>
    <login-container></login-container>
    <el-menu :router="true" class="menu">
      <el-menu-item index="1" route="about">
        <i class="el-icon-setting"></i>
        <span>About</span>
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script>
import LoginContainer from "../login/LoginContainer.vue";

export default {
  components: {
    LoginContainer
  }
}
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
}
</style>

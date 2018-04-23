<template>
  <el-row class="footer content-section">
    <el-col :xs="24" :md="12">
      <ul>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </el-col>
    <el-col :xs="24" :md="12">
      <ul>
        <li><router-link to="/privacy">Privacy policy</router-link></li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.footer {
  ul li {
    list-style-type: none;
    a {
      text-decoration: none;
      color: $extra-light-border;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>


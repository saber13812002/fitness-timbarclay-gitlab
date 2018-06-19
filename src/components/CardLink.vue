<template>
  <el-card class="card-link space" v-on:click.native="navigate">
    <slot></slot>
  </el-card>
</template>

<script>

export default {
  props: {
    to: {type: [String, Object], required: false}
  },
  methods: {
    navigate() {
      this.$router.push(this.to);
    }
  }
}
</script>

<style lang="scss">
@import "../sass/variables";

$min-card-height: 6em;
$head-width: 6em;
$ball-size: 10px;
$line-width: 2px;
$space-between: 1em;

.card-link {
  text-decoration: none;
  cursor: pointer;
}

.card-link:hover {
  box-shadow:
    0 3px 3px 0 rgba(0,0,0,0.14),
    0 4px 2px -1px rgba(0,0,0,0.12),
    0 2px 6px 2px rgba(0,0,0,0.2);
}
</style>


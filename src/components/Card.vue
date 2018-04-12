<template>
  <div class="card-container">
    <div class="ball" v-if="$slots.ball">
      <slot name="ball"></slot>
    </div>
    <div class="card">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";

$ball-size: 6em;
$line-width: 2px;
$space-between: 1em;

.card-container {
  display: flex;
  color: $primary-text;
  margin: $space-between 0;
  position: relative;
  .ball {
    display: inline-block;
    min-height: $ball-size;
    min-width: $ball-size;
    border-radius: 50%;
    background-color: $warning;
    margin-right: $space-between;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card {
    display: inline-block;
    height: calc(#{$ball-size} - $space-between);
    width: 100%;
    background-color: $base-border;
    padding: $space-between;
    position: relative;
  }
}

.card-container:not(:last-child) .ball:after {
  content: '';
  width: $line-width;
  height: $space-between;
  background-color: black;
  display: block;
  position: absolute;
  bottom: -$space-between;
  left: calc(#{$ball-size / 2} - #{$line-width / 2});
}
</style>


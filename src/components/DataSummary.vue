<template>
  <div class="summary-item">
    <div class="value">{{value}}</div>
    <div v-if="description" class="description">{{description}}</div>
  </div>
</template>

<script>
export default {
  props: {
    description: {type: String, required: false},
    value: {type: String | Number, required: true}
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
  .value {
    font-size: 1.4em;
    line-height: 1.3em;
    font-weight: bold;
  }
  .description {
    font-size: 0.8em;
  }
}
</style>

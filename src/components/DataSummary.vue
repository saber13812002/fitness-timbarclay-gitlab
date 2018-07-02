<template>
  <div class="summary-item">
    <div v-if="description" class="description">{{description}}</div>
    <div class="value">{{value}}</div>
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
  .description {
    color: $secondary-text;
  }
  .value {
    font-size: 2.8em;
    color: $primary-brand;
    line-height: 0.8em;
    font-weight: bold;
  }
}
</style>

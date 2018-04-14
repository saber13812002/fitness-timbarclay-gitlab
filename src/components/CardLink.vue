<template>
  <router-link class="card-link" :to="to">
    <card>
      <slot slot="head" name="head"></slot>
      <slot></slot>
    </card>
  </router-link>
</template>

<script>
import Card from "./Card.vue";

export default {
  props: {
    to: {type: [String, Object], required: false}
  },
  components: {
    Card
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
}

.card-link:hover .card-container {
  .ball {
    background-color: $secondary-brand;
  }
  .card {
    box-shadow:
      0 3px 3px 0 rgba(0,0,0,0.14),
      0 4px 2px -1px rgba(0,0,0,0.12),
      0 2px 6px 2px rgba(0,0,0,0.2);
  }
}

// TODO this is duplicated here from Card.vue because otherwise we can't tell if we're last child
.card-link:not(:last-child) .card-container .ball:after {
  content: '';
  width: $line-width;
  height: calc(#{$min-card-height} + #{$ball-size});
  background-color: $base-border;
  display: block;
  position: absolute;
  top: calc(50% + 5px);
  left: calc(#{($ball-size / 2)} - #{($line-width / 2)});
}
</style>


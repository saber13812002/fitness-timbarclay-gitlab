<template>
  <router-link class="card-link" :to="to">
    <card>
      <slot slot="ball" name="ball"></slot>
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

$ball-size: 6em;
$line-width: 2px;
$space-between: 1em;

.card-link {
  text-decoration: none;
}

.card-link:hover {
  .ball {
    background-color: darken($warning, 10%);
    box-shadow: $placeholder-text ($space-between / 2) ($space-between / 2) 0 0;
  }
  .card {
    box-shadow: $placeholder-text ($space-between / 2) ($space-between / 2) 0 0;
  }
}

// TODO this is duplicated here from Card.vue because otherwise we can't tell if we're last child
.card-link:not(:last-child) .card-container .ball:after {
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


<template>
  <div class="card-container" :class="{'has-head': $slots.head}">
    <div class="head" v-if="$slots.head">
      <slot name="head"></slot>
    </div>
    <div class="ball hidden-sm-and-down"></div>
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

$min-card-height: 4em;
$head-width: 6em;
$ball-size: 10px;
$space-between: 1em;
$line-width: 2px;
$min-card-total-height: $min-card-height + ($space-between * 2);

.card-container {
  display: flex;
  color: $regular-text;
  margin: $space-between 0;
  position: relative;
  .ball {
    display: inline-block;
    height: $ball-size;
    width: $ball-size;
    border-radius: 50%;
    background-color: $base-border;
    margin-right: $space-between;
    position: absolute;
    top: calc(50% - #{$ball-size / 2});
  }
  .card {
    margin-left: $space-between * 2;
    display: inline-block;
    min-height: $min-card-height;
    width: 100%;
    background-color: $white;
    border-radius: $box-corner-radius;
    padding: $space-between;
    position: relative;
    @include drop-shadow;

    .secondary {
      font-size: 0.8em;
      font-style: italic;
    }
  }
}

.card-container.has-head {
  .head {
    display: inline-block;
    font-style: italic;
    min-height: $min-card-total-height;
    width: $head-width;
    min-width: $head-width;
    display: flex;
    align-items: center;
  }
  .ball {
    left: $head-width;
  }
}

// TODO this doesn't work if the size of the card increases
.card-container:not(:last-child) .ball:after {
  content: '';
  width: $line-width;
  height: calc(#{$min-card-total-height} + #{$ball-size});
  background-color: $base-border;
  display: block;
  position: absolute;
  top: calc(50% + 5px);
  left: calc(#{($ball-size / 2)} - #{($line-width / 2)});
}

@media only screen and (max-width: 990px) {
  .card-container .card {
    margin-left: 0;
  }
}
</style>


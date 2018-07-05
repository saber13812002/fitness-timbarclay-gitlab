<template>
  <div class="content-section padded">
    <div v-html="content"></div>
  </div>
</template>

<script>
import about from "./content/about.md";

export default {
  data() {
    return {
      content: about
    }
  }
}
</script>

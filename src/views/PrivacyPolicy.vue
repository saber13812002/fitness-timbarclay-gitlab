<template>
  <div class="content-section padded">
    <div v-html="content"></div>
  </div>
</template>

<script>
import privacy from "./content/privacy.md";
export default {
  data() {
    return {
      content: privacy
    }
  }
}
</script>
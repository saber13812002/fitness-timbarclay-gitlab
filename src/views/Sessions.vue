<template>
  <div>
    <sessions-list v-if="!isChildRoute"/>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SessionsList from "../components/sessions/SessionsList.vue"

export default {
  components: {
    SessionsList
  },
  computed: {
    isChildRoute() {
      return this.$route.name === "session";
    }
  }
}
</script>

<style>

</style>

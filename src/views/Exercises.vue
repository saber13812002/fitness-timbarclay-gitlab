<template>
  <div>
    <exercises-list v-if="!isChildRoute"/>
    <div v-else>
      <router-link to="/exercises">Back</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ExercisesList from "../components/exercises/ExercisesList.vue";

export default {
  components: {
    ExercisesList
  },
  computed: {
    isChildRoute() {
      return this.$route.name !== "exercises";
    }
  }
}
</script>

<style>

</style>

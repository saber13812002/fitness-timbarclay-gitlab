<template>
  <fitness-container>
    <router-view></router-view>
  </fitness-container>
</template>

<script>
import FitnessContainer from "../components/fitness/FitnessContainer.vue";
import SessionsList from "../components/sessions/SessionsList.vue";

export default {
  name: 'home',
  components: {
    FitnessContainer,
    SessionsList
  },

}
</script>

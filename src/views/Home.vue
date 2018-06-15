<template>
  <dates-container :start="start">
    <fitness-container>
      <router-view></router-view>
    </fitness-container>
  </dates-container>
</template>

<script>
import FitnessContainer from "../components/fitness/FitnessContainer.vue";
import SessionsList from "../components/sessions/SessionsList.vue";
import DatesContainer from "../components/dates/DatesContainer.vue";

export default {
  name: 'home',
  props: {
    start: {type: String, required: false}
  },
  components: {
    FitnessContainer,
    SessionsList,
    DatesContainer
  },

}
</script>

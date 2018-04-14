<template>
  <div>
    <div v-if="loadingSessions || loadingSets">Loading</div>
    <div v-else-if="!exercise">There doesn't seem to be anything here</div>
    <div v-else>
      <h2>{{exercise.name}}</h2>
      <exercise-summary :exercise="exercise"/>
      <exercise-chart/>
      <exercise-workout-list :exercise="exercise" />
    </div>
  </div>
</template>

<script>
import ExerciseSummary from "../components/exercises/ExerciseSummary.vue";
import ExerciseWorkoutList from "../components/exercises/ExerciseWorkoutList.vue";
import ExerciseChart from "../components/exercises/ExerciseChart.vue";
import {mapGetters, mapState} from "vuex";
import _ from "lodash";

export default {
  data() {
    return {
      exerciseName: this.$route.params.name
    };
  },
  computed: {
    ...mapState({
      loadingSessions: state => state.exercise.loadingSessions,
      loadingSets: state => state.exercise.loadingSets
    }),
    ...mapGetters([
      "exercises"
    ]),
    exercise() {
      return _.find(this.exercises, e => e.name.toLowerCase() === this.exerciseName.toLowerCase());
    },
    maxResistance() {
      return this.exercise.maxResistance();
    },
    maxResistanceLastSession() {
      return this.exercise.maxResistanceLastSession();
    }
  },
  components: {
    ExerciseSummary,
    ExerciseWorkoutList,
    ExerciseChart
  }
}
</script>

<style>

</style>

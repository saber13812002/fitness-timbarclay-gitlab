<template>
  <div>
    <div v-if="loadingSessions || loadingSets">Loading</div>
    <div v-else-if="!exercise">There doesn't seem to be anything here</div>
    <div v-else>
      <h2>{{exercise.name}}</h2>
      <exercise-container :exercise="exercise"/>
    </div>
  </div>
</template>

<script>
import ExerciseContainer from "../components/exercises/ExerciseContainer.vue";
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
    ExerciseContainer
  }
}
</script>

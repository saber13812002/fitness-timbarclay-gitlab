<template>
  <div>
    <div v-if="loadingSessions || loadingSets">Loading</div>
    <div v-else-if="!exercise">There doesn't seem to be anything here</div>
    <div v-else>
      <h2>{{exercise.name}}</h2>
      <exercise-container :exercise="exercise" :one-rep-max="oneRepMax" />
    </div>
  </div>
</template>

<script>
import ExerciseContainer from "../components/exercises/ExerciseContainer.vue";
import {mapGetters, mapState} from "vuex";
import _find from "lodash/find";

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
      "exercises",
      "oneRepMax"
    ]),
    exercise() {
      return _find(this.exercises, e => e.name.toLowerCase() === this.exerciseName.toLowerCase());
    }
  },
  components: {
    ExerciseContainer
  }
}
</script>

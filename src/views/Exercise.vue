<template>
  <div>
    <div v-if="!exercise">There doesn't seem to be anything here</div>
    <exercise-container v-else :exercise="exercise" :one-rep-max="oneRepMax" />
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

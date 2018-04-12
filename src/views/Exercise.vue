<template>
  <div>
    <div v-if="loadingSessions || loadingSets">Loading</div>
    <div v-else-if="!exercise">There doesn't seem to be anything here</div>
    <div v-else>
      <h2>{{exercise.name}}</h2>
      <div>
        Max resistance: {{exercise.maxResistance()}}
        Max last session: {{exercise.maxResistanceLastSession()}}
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  }
}
</script>

<style>

</style>

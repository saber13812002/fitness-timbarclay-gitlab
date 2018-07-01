<template>
  <div>
    <div class="heading-row">
      <h2 class="no-top">Exercises</h2>
      <aside>Since {{formatDate(start)}}</aside>
    </div>
    <div v-if="orderedExercises.length">
      <card-link v-for="exercise in orderedExercises" :to="exerciseLink(exercise)" :key="exercise.name">
        <div>{{exercise.name}}</div>
        <div class="exercise-details">
          <div>{{numberOfSessions(exercise)}}</div>
          <div>Max resistance: {{maxResistance(exercise)}}</div>
        </div>
      </card-link>
    </div>
    <div v-else>
      There doesn't seem to be anything here.
    </div>
  </div>
</template>

<script>
import CardLink from "../CardLink.vue";
import {renderWeight} from "../../application/resistanceHelpers";
import {mapGetters, mapState} from "vuex";
import _sortBy from "lodash/sortBy";
import moment from "moment";

export default {
  computed: {
    ...mapState({
      loadingSessions: state => state.exercise.loadingSessions,
      loadingSets: state => state.exercise.loadingSets,
      start: state => state.dates.start,
      end: state => state.dates.end
    }),
    ...mapGetters([
      "exercises"
    ]),
    orderedExercises() {
      return _sortBy(this.exercises, e => e.name);
    }
  },
  components: {
    CardLink
  },
  methods: {
    exerciseLink(exercise) {
      return {
        name: "exercise",
        params: {name: exercise.name}
      }
    },
    formatDate(date) {
      return moment(date).format("Do MMMM YYYY"); // TODO remove moment from here
    },
    numberOfSessions(exercise) {
      return `${exercise.sessions.length} sessions`;
    },
    maxResistance(exercise) {
      const max = exercise.maxResistance();
      return max ? renderWeight(max.resistance) : "";
    }
  }
}
</script>

<style lang="scss" scoped>
.exercise-details {
  font-size: 0.8em;
  font-style: italic;
}
</style>

<template>
  <div>
    <h2>Exercises done between {{formatDate(start)}} and {{formatDate(end)}}</h2>
    <card-link v-for="exercise in orderedExercises" :to="exerciseLink(exercise)" :key="exercise.name">
      <div>{{exercise.name}}</div>
      <div class="exercise-details">
        <div>{{numberOfSessions(exercise)}}</div>
        <div>Max resistance: {{exercise.maxResistance().resistance}}kg</div>
      </div>
    </card-link>
  </div>
</template>

<script>
import CardLink from "../CardLink.vue";
import {mapGetters, mapState} from "vuex";
import _ from "lodash";
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
      return _.orderBy(this.exercises, e => e.name);
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
      return moment(date).format("Do MMM YY");
    },
    numberOfSessions(exercise) {
      return `${exercise.sessions.length} sessions`;
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

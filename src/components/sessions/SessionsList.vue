<template>
  <div>
    <h2>Sessions from {{formatDate(start)}} to {{formatDate(end)}}</h2>
    <card-link v-for="session in reversedSessions" :to="sessionLink(session.session)" :key="session.session.id">
      <span slot="head">{{sessionStart(session)}}</span>
      <div>{{session.session.name}}</div>
      <div>{{duration(session)}}</div>
      <span class="exercise-list">{{listExercises(session)}}</span>
    </card-link>
  </div>
</template>

<script>
import CardLink from "../CardLink.vue";
import {mapState, mapGetters} from "vuex";
import moment from "moment";
import _sortBy from "lodash/sortBy";
import _uniq from "lodash/uniq";

export default {
  computed: {
    ...mapGetters([
      "workoutSessions"
    ]),
    ...mapState({
      sessions: state => state.exercise.sessions,
      start: state => state.dates.start,
      end: state => state.dates.end
    }),
    reversedSessions() {
      return _sortBy(this.workoutSessions, s => -s.session.start);
    }
  },
  components: {
    CardLink
  },
  methods: {
    sessionStart(session) {
      return moment(session.session.start).format("Do MMM")
    },
    sessionLink(session) {
      return {
        name: "session",
        params: { id: session.id }
      }
    },
    formatDate(date) {
      return moment(date).format("Do MMM YY");
    },
    listExercises(session) {
      return _uniq(session.sets.map(s => s.exerciseName)).join(", ");
    },
    duration(session) {
      const {start, end} = session.session;
      const durationMillis = end - start;
      return `${Math.round(durationMillis / 1000 / 60)} minutes`;
    }
  }
}
</script>

<style lang="scss" scoped>
.exercise-list {
  font-size: 0.8em;
  font-style: italic;
}
</style>

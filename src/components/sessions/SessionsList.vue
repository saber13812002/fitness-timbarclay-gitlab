<template>
  <div>
    <div class="heading-row">
      <h2 class="no-top">Workout Sessions</h2>
    </div>
    <div v-if="reversedSessions.length">
      <card-link v-for="session in reversedSessions" :to="sessionLink(session.session)" :key="session.session.id">
        <div>{{sessionStart(session)}} - {{session.session.name}}</div>
        <div>{{duration(session)}}</div>
        <span class="exercise-list">{{listExercises(session)}}</span>
      </card-link>
      <div class="center-content">
        <el-button type="info" round v-on:click="loadMore">Load more</el-button>
      </div>
    </div>
    <div v-else>
      <div>
        There's nothing here <!-- Give more information, maybe including instructions about Google Fit app etc -->
      </div>
      <div class="center-content">
        <el-button type="info" round v-on:click="loadMore">Look further back in time</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CardLink from "../CardLink.vue";
import {mapState, mapGetters} from "vuex";
import moment from "moment";
import mutations from "../../vuex/mutations";
import _sortBy from "lodash/sortBy";
import _uniq from "lodash/uniq";
import _round from "lodash/round";

export default {
  computed: {
    ...mapGetters([
      "workoutSessions"
    ]),
    ...mapState({
      sessions: state => state.exercise.sessions,
      start: state => state.dates.start
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
      return moment(session.session.start).format("ddd Do MMM")
    },
    sessionLink(session) {
      return {
        name: "session",
        params: { id: session.id }
      }
    },
    formatDate(date) {
      return moment(date).format("Do MMMM YYYY");
    },
    listExercises(session) {
      return _uniq(session.sets.map(s => s.exerciseName)).join(", ");
    },
    duration(session) {
      const {start, end} = session.session;
      const durationMillis = end - start;
      return `${_round(durationMillis / 1000 / 60)} minutes`;
    },
    loadMore() {
      this.$store.commit(mutations.PUSH_DATE);
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

<template>
  <div class="padded">
    <div v-if="reversedSessions.length">
      <card-link v-for="session in reversedSessions" class="session-card" :to="sessionLink(session.session)" :key="session.session.id">
        <el-row style="display:flex">
          <el-col :span="6">
            <div class="date-header">
              <div>{{sessionStart(session).format("ddd")}}</div>
              <div>{{sessionStart(session).format("Do")}}</div>
              <div class="month">{{sessionStart(session).format("MMMM")}}</div>
            </div>
          </el-col>
          <el-col :span="18">
            <el-row><h3>{{session.session.name}}</h3></el-row>
            <el-row><div class="exercise-list">{{listExercises(session)}}</div></el-row>
            <el-row>
              <div class="session-stats">
                <div><i class="far fa-clock" /> {{duration(session)}}</div>
                <div><i class="fas fa-dumbbell" /> {{session.sets.length}} sets</div>
                <div><!-- <i class="far fa-clock" /> {{duration(session)}} --></div> <!-- TODO another stat here -->
              </div>
            </el-row>
          </el-col>
        </el-row>
      </card-link>
      <div class="center-content">
        <el-button type="info" v-on:click="loadMore">Load more</el-button>
      </div>
    </div>
    <div v-else>
      <div class="space">
        <p>There's nothing here</p> <!-- Give more information, maybe including instructions about Google Fit app etc -->
        <p>To start collecting data, you'll need an Android WearOS device with the Google Fit app. Then just start a Strength Training session.</p>
      </div>
      <div class="center-content">
        <el-button type="info" v-on:click="loadMore">Look further back in time</el-button>
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
      return moment(session.session.start)
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
    uniqExercises(session) {
      return _uniq(session.sets.map(s => s.exerciseName));
    },
    listExercises(session) {
      return this.uniqExercises(session).join(", ");
    },
    duration(session) {
      const {start, end} = session.session;
      const durationMillis = end - start;
      return `${_round(durationMillis / 1000 / 60)} minutes`;
    },
    startToEnd(session) {
      const {start, end} = session.session;
      const dateSt = d => moment(d).format("h:mm a");
      return `${dateSt(start)} - ${dateSt(end)}`;
    },
    loadMore() {
      this.$store.commit(mutations.PUSH_DATE);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.session-card {
  h3 {
    margin: 0 0 0.3em;
  }
  .exercise-list {
    font-size: 0.8em;
    color: $secondary-text;
    margin-bottom: 0.5em;
  }
  .session-stats {
    font-size: 0.7em;
    color: $regular-text;
    display: flex;
    justify-content: space-between;
  }
  .date-header {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    line-height: 0.9em;
    font-size: 1.4em;
    .month {
      font-size: 0.8em;
    }
  }
}
</style>

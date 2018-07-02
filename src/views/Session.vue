<template>
  <div>
    <div v-if="loadingSessions || loadingSets" class="padded">Loading</div>
    <div v-else-if="!session" class="padded">There doesn't seem to be anything here</div>
    <div v-else>
      <div class="padded">
        <h2 class="no-top">{{session.session.name}}</h2>
        <span>{{sessionStart}}</span>
      </div>
      <sets-list :sets="session.sets" />
    </div>
  </div>
</template>

<script>
import SetsList from "../components/sessions/SetsList.vue";
import {mapGetters, mapState} from "vuex";
import _find from "lodash/find";
import moment from "moment";

export default {
  data() {
    return {
      sessionId: this.$route.params.id
    }
  },
  computed: {
    ...mapState({
      loadingSessions: state => state.exercise.loadingSessions,
      loadingSets: state => state.exercise.loadingSets
    }),
    ...mapGetters([
      "workoutSessions"
    ]),
    session() {
      return _find(this.workoutSessions, s => s.session.id === this.sessionId);
    },
    sessionStart() {
      return moment(this.session.session.start).format("dddd Do MMM YYYY, h:mm a");
    }
  },
  components: {
    SetsList
  }
}
</script>

<style lang="scss" scoped>
.scroll-card {
  overflow-x: auto;
}
h2 {
  margin-bottom: 0.2em;
}
.padded {
  margin-bottom: 1em;
}
</style>

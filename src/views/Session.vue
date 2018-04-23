<template>
  <div>
    <div v-if="loadingSessions || loadingSets">Loading</div>
    <div v-else-if="!session">There doesn't seem to be anything here</div>
    <div v-else>
      <h2>{{session.session.name}}</h2>
      <span>{{session.session.start.format("dddd Do MMM YYYY, h:mm a")}}</span>
      <sets-list :sets="session.sets" />
    </div>
  </div>
</template>

<script>
import SetsList from "../components/sessions/SetsList.vue";
import {mapGetters, mapState} from "vuex";
import _find from "lodash/find";

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
    }
  },
  components: {
    SetsList
  }
}
</script>

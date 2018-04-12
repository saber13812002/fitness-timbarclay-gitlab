<template>
  <div>
    <sets-list :session="session" :loading="loadingSessions || loadingSets" />
  </div>
</template>

<script>
import SetsList from "../components/sessions/SetsList.vue";
import {mapGetters, mapState} from "vuex";
import _ from "lodash";

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
      return _.find(this.workoutSessions, s => s.session.id === this.sessionId);
    }
  },
  components: {
    SetsList
  }
}
</script>

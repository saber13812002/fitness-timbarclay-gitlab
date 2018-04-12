<template>
  <div>
    <div v-if="loadingSessions">Loading</div>
    <router-link v-else v-for="session in sessions" :to="sessionLink(session)" :key="session.id">
      {{session.start.format("Do MMM")}} {{session.name}}
    </router-link>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState({
      sessions: state => state.exercise.sessions,
      loadingSessions: state => state.exercise.loadingSessions
    }),
    reversedSessions() {
      return this.sessions.reverse();
    }
  },
  methods: {
    sessionLink(session) {
      return {
        name: "session",
        params: { id: session.id }
      }
    }
  }
}
</script>

<style>

</style>

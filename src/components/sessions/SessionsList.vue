<template>
  <div>
    <h2>Sessions from {{formatDate(start)}} to {{formatDate(end)}}</h2>
    <card-link v-for="session in sessions" :to="sessionLink(session)" :key="session.id">
      <span slot="ball">{{session.start.format("Do MMM")}}</span>
      {{session.name}}
    </card-link>
  </div>
</template>

<script>
import CardLink from "../CardLink.vue";
import {mapState} from "vuex";
import moment from "moment";

export default {
  computed: {
    ...mapState({
      sessions: state => state.exercise.sessions,
      loadingSessions: state => state.exercise.loadingSessions,
      start: state => state.dates.start,
      end: state => state.dates.end
    }),
    reversedSessions() {
      return this.sessions.reverse();
    }
  },
  components: {
    CardLink
  },
  methods: {
    sessionLink(session) {
      return {
        name: "session",
        params: { id: session.id }
      }
    },
    formatDate(date) {
      return moment(date).format("Do MMM YY");
    }
  }
}
</script>

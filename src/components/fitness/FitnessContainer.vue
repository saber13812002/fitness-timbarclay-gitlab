<template>
  <div>
    <div v-if="loadingSessions">Loading</div>
    <div v-else v-for="session in sessions" :key="session.id">{{session.name}}</div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import actions from "../../vuex/actions";

export default {
  computed: {
    ...mapState({
      sessions: state => state.exercise.sessions,
      loadingSessions: state => state.exercise.loadingSessions
    })
  },
  mounted() {
    this.$store.dispatch(actions.FETCH_SESSIONS);
  }
}
</script>

<style>

</style>

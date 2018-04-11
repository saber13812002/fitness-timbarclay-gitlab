<template>
  <div>
    <div v-if="loadingSessions">Loading</div>
    <div v-else v-for="session in sessions" :key="session.id">{{session.name}}</div>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import actions from "../../vuex/actions";

export default {
  computed: {
    ...mapState({
      sessions: state => state.exercise.sessions,
      loadingSessions: state => state.exercise.loadingSessions
    }),
    ...mapGetters([
      "dates"
    ])
  },
  /* mounted() {
    this.$store.dispatch(actions.FETCH_SESSIONS);
  }, */
  watch: {
    dates: {
      handler: "fetchData",
      immediate: true
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch(actions.FETCH_SESSIONS);
    }
  }
}
</script>

<style>

</style>

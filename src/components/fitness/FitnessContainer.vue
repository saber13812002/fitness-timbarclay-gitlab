<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import SessionsList from "../sessions/SessionsList.vue";
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
  watch: {
    dates: {
      handler: "fetchData",
      immediate: true
    }
  },
  components: {
    SessionsList
  },
  methods: {
    fetchData() {
      this.$store.dispatch(actions.FETCH_SESSIONS);
      this.$store.dispatch(actions.FETCH_SETS);
    }
  }
}
</script>

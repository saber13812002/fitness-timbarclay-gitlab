<template>
  <div>
    <div v-if="loadingSessions">Loading</div>
    <div v-else v-for="session in sessions" :key="session.id">
      {{session.start.format("Do MMM")}} {{session.name}}
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState({
      sessions: state => state.exercise.sessions,
      loadingSessions: state => state.exercise.loadingSessions
    })
  }
}
</script>

<style>

</style>

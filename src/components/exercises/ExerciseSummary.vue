<template>
  <el-card>
    <div>Max resistance: {{maxResistance.resistance}} ({{maxResistance.reps}} reps)</div>
    <div>Max last session: {{maxResistanceLastSession.resistance}} ({{maxResistanceLastSession.reps}} reps)</div>
  </el-card>
</template>

<script>
export default {
  props: {
    exercise: {type: Object, required: true}
  },
  computed: {
    maxResistance() {
      return this.exercise.maxResistance();
    },
    maxResistanceLastSession() {
      return this.exercise.maxResistanceLastSession();
    }
  }
}
</script>

<style>

</style>

<template>
  <div>
    <exercise-summary :exercise="exercise" :one-rep-max="oneRepMax"/>
    <exercise-chart :workout-sessions="exercise.sessions" :get-intensity="intensityFunc" style="height: 300px"/>
    <exercise-workout-list :exercise="exercise" />
  </div>
</template>

<script>
import ExerciseSummary from "./ExerciseSummary.vue";
import ExerciseWorkoutList from "./ExerciseWorkoutList.vue";
import ExerciseChart from "./ExerciseChart.vue";
import {volumeLoad} from "../../application/models/IntensityMetrics";
import {Set} from "../../application/models/Set";

export default {
  props: {
    exercise: {type: Object, required: true},
    oneRepMax: {type: Object, required: true}
  },
  data() {
    return {
      intensityFunc: workout => workout.sessionIntensityOhlc(volumeLoad.calculate).high.resistance
    }
  },
  components: {
    ExerciseSummary,
    ExerciseWorkoutList,
    ExerciseChart
  }
}
</script>

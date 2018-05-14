<template>
  <div>
    <exercise-summary :exercise="exercise" :one-rep-max="oneRepMax"/>

    <exercise-chart :workout-sessions="exercise.sessions" :options="chartOptions" style="height: 300px"/>

    <el-row>
      <el-select :value="intensityMetric.id" v-on:input="setIntensityMetric">
        <el-option v-for="opt in metricOptions" :key="opt.id" :value="opt.id" :label="opt.name" />
      </el-select>

      <el-select :value="statsType.id" v-on:input="setStatsType">
        <el-option v-for="opt in statsOptions" :key="opt.id" :value="opt.id" :label="opt.name" />
      </el-select>
    </el-row>

    <exercise-workout-list :exercise="exercise" />
  </div>
</template>

<script>
import ExerciseSummary from "./ExerciseSummary.vue";
import ExerciseWorkoutList from "./ExerciseWorkoutList.vue";
import ExerciseChart from "./ExerciseChart.vue";
import mutations from "../../vuex/mutations";
import * as metrics from "../../application/models/IntensityMetrics";
import * as stats from "../../application/models/DescriptiveStats";
import {Set} from "../../application/models/Set";
import {mapGetters} from "vuex";

export default {
  props: {
    exercise: {type: Object, required: true},
    oneRepMax: {type: Object, required: true}
  },
  data() {
    return {
      metricOptions: metrics.all,
      statsOptions: stats.all
    }
  },
  computed: {
    ...mapGetters([
      "intensityMetric",
      "statsType"
    ]),
    chartOptions() {
      return {
        intensity: this.intensityMetric,
        stats: this.statsType,
        calculate: this.calculate
      }
    }
  },
  methods: {
    setIntensityMetric(metricId) {
      this.$store.commit(mutations.SET_INTENSITY_METRIC, {metricId});
    },
    setStatsType(statsId) {
      this.$store.commit(mutations.SET_STATS_TYPE, {statsId});
    },
    calculate(workout) {
      return workout.reduceSets(this.intensityMetric.calculate, this.statsType.calculate);
    }
  },
  components: {
    ExerciseSummary,
    ExerciseWorkoutList,
    ExerciseChart
  }
}
</script>

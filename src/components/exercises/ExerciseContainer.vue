<template>
  <div>
    <exercise-summary class="space" :exercise="exercise" :one-rep-max="oneRepMax" :est-one-rep-max="estOneRepMax"/>

    <el-card v-if="showChart">
      <h3>Progression</h3>

      <exercise-chart class="space" :workout-sessions="exercise.sessions" :options="chartOptions" style="height: 300px"/>

      <el-row :gutter="20">
        <el-col :xs="12" :md="6">
          <el-select :value="intensityMetric.id" v-on:input="setIntensityMetric">
            <el-option v-for="opt in metricOptions" :key="opt.id" :value="opt.id" :label="opt.name" />
          </el-select>
        </el-col>

        <el-col :xs="12" :md="6">
          <el-select :value="statsType.id" v-on:input="setStatsType">
            <el-option v-for="opt in statsOptions" :key="opt.id" :value="opt.id" :label="opt.name" />
          </el-select>
        </el-col>
      </el-row>
    </el-card>

    <h3>Sessions</h3>
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
import _includes from "lodash/includes";
import _round from "lodash/round";

export default {
  props: {
    exercise: {type: Object, required: true},
    oneRepMax: {type: Object, required: true}
  },
  data() {
    return {
      metricOptions: metrics.all
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
    },
    estOneRepMax() {
      return _round(this.exercise.maxOneRepMax(this.oneRepMax.calculate()));
    },
    showChart() {
      return this.exercise.sessions && this.exercise.sessions.length > 1;
    },
    statsOptions() {
      return stats.all.filter(s => _includes(this.intensityMetric.stats, s.id));
    }
  },
  watch: {
    statsOptions(options) {
      if(!_includes(options.map(o => o.id), this.statsType.id)) {
        this.setStatsType(options[0].id);
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
      return workout.reduceSets(this.intensityMetric.calculate(this.estOneRepMax), this.statsType.calculate());
    }
  },
  components: {
    ExerciseSummary,
    ExerciseWorkoutList,
    ExerciseChart
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.el-select {
  width: 100%;
}
</style>

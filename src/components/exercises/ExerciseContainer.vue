<template>
  <div class="exercise-page">
    <exercise-summary class="space" :exercise="exercise" :one-rep-max="oneRepMax" :est-one-rep-max="estOneRepMax"/>

    <div class="padded progression-container" v-if="showChart">
    
      <h3 class="padded">Progression</h3>
      
      <el-card>
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
    </div>

    <div class="padded progression-container" v-if="showChart">
      <h3 class="padded">Progression</h3>

      <el-card>
        <exercise-chart2 class="space" :workout-sessions="exercise.sessions" :options="chartOptions"/>
      </el-card>
    </div>

    <div class="padded">
      <h3>Sessions</h3>
      <exercise-workout-list :exercise="exercise" />
    </div>
  </div>
</template>

<script>
import ExerciseSummary from "./ExerciseSummary.vue";
import ExerciseWorkoutList from "./ExerciseWorkoutList.vue";
import ExerciseChart from "./ExerciseChart.vue";
import ExerciseChart2 from "./ExerciseChart2.vue";
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
      "statsType",
      "weightUnit"
    ]),
    chartOptions() {
      return {
        intensity: this.intensityMetric,
        weightUnit: this.weightUnit,
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
      const value = workout.reduceSets(this.intensityMetric.calculate(this.estOneRepMax), this.statsType.calculate(), this.weightUnit);
      return _round(this.weightUnit.calculate()(value), 1);
    }
  },
  components: {
    ExerciseSummary,
    ExerciseWorkoutList,
    ExerciseChart,
    ExerciseChart2
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.el-select {
  width: 100%;
}
.exercise-page {
  margin-top: -9px; // Not sure what's going on here...
}
.progression-container {
  div.el-card {
    border: 0 !important;
  }
}
.point {
  @include drop-shadow;
}
</style>

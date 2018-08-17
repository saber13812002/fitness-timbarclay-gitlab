<template>
  <div class="exercise-page">
    <exercise-summary class="space" :exercise="exercise" :one-rep-max="oneRepMax" :est-one-rep-max="estOneRepMax" :is-body-weight="isBodyWeight"/>

    <div class="padded progression-container" v-if="showChart">
      <h3 class="padded">Progression</h3>

      <el-card>
        <exercise-chart :workout-sessions="exercise.sessions" :one-rep-max="estOneRepMax" :weight-unit="weightUnit" :stats-type="statsType" :is-body-weight="isBodyWeight"/>

        <el-row :gutter="20">
          <el-col :xs="12" :md="6">
            <el-select :value="statsType.id" v-on:input="setStatsType">
              <el-option v-for="opt in statsOptions" :key="opt.id" :value="opt.id" :label="opt.name" />
            </el-select>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <div class="padded">
      <h3>Sessions</h3>
      <exercise-workout-list :exercise="exercise" :is-body-weight="isBodyWeight"/>
    </div>
  </div>
</template>

<script>
import ExerciseSummary from "./ExerciseSummary.vue";
import ExerciseWorkoutList from "./ExerciseWorkoutList.vue";
import ExerciseChart from "./ExerciseChart.vue";
import mutations from "../../vuex/mutations";
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
      "statsType",
      "weightUnit"
    ]),
    estOneRepMax() {
      return _round(this.exercise.maxOneRepMax(this.oneRepMax.calculate()));
    },
    showChart() {
      return this.exercise.sessions && this.exercise.sessions.length > 1;
    },
    statsOptions() {
      return [stats.total, stats.max, stats.mean];
    },
    isBodyWeight() {
      return this.estOneRepMax === 0;
    }
  },
  methods: {
    setStatsType(statsId) {
      this.$store.commit(mutations.SET_STATS_TYPE, {statsId});
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

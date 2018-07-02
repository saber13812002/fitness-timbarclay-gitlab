<template>
  <div class="exercise-summary">
    <h4>Summary</h4>
    <div class="summary-items">
      <div>
        <el-tooltip>
          <div slot="content">{{maxResistance.reps}} reps. {{formatSetDate(maxResistance)}}</div>
          <data-summary description="Max resistance" :value="renderWeight(maxResistance.resistance)"/>
        </el-tooltip>
      </div>
      <div>
        <el-tooltip>
          <div slot="content">{{maxResistanceLastSession.reps}} reps. {{formatSetDate(maxResistanceLastSession)}}</div>
          <data-summary description="Max last session" :value="renderWeight(maxResistanceLastSession.resistance)"/>
        </el-tooltip>
      </div>
      <div>
        <el-tooltip>
          <div slot="content">Estimated using {{oneRepMax.name}}. Change this in <a href="/settings">settings</a></div><!-- Not quite sure why I can't use a router-link here but it gives an error -->
          <data-summary description="Estimated 1 rep max" :value="renderWeight(estOneRepMax)"/>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DataSummary from "../DataSummary.vue";
import {renderWeight} from "../../application/resistanceHelpers";

export default {
  props: {
    exercise: {type: Object, required: true},
    oneRepMax: {type: Object, required: true},
    estOneRepMax: {type: Number, required: true}
  },
  computed: {
    maxResistance() {
      return this.exercise.maxResistance();
    },
    maxResistanceLastSession() {
      return this.exercise.maxResistanceLastSession();
    }
  },
  methods: {
    formatSetDate(set) {
      return moment(set.start).format("dddd Do MMMM YYYY");
    },
    renderWeight
  },
  components: {
    DataSummary
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.summary-items {
  display: flex;
  justify-content: space-around;
  &> div {
    margin-bottom: $normal-space;
  }
}
@media only screen and (max-width: 990px) {
  .exercise-summary {
    background: url("../../assets/images/plate-step-1000.jpg") no-repeat center center;
    background-size: cover;
    margin-top: -22px; // Not sure why this needs to be here...
  }
  .summary-items {
    display: block;
  }
}
</style>

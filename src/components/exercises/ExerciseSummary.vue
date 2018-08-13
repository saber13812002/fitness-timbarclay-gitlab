<template>
  <div class="exercise-summary">
    <div class="extra-padded">
      <el-row><h2>{{exercise.name}}</h2></el-row>
      
      <!-- We generally show this summary when we're talking about an exercise that uses weights -->
      <div v-if="!isBodyWeight" class="summary-items">
        <div>
          <el-tooltip>
            <div slot="content">{{maxResistance.reps}} reps. {{formatSetDate(maxResistance)}}</div>
            <data-summary description="Max weight" :value="renderWeight(maxResistance.resistance)"/>
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
            <data-summary description="1 rep max" :value="renderWeight(estOneRepMax)"/>
          </el-tooltip>
        </div>
      </div>

      <!-- We show this summary when we're talking about a body weight exercise -->
      <div v-else class="summary-items">
        <div>
          <el-tooltip>
            <div slot="content">{{formatSetDate(maxReps)}}</div>
            <data-summary description="Max reps" :value="maxReps.reps"/>
          </el-tooltip>
        </div>
        <div>
          <el-tooltip>
            <div slot="content">{{formatSetDate(maxRepsLastSession)}}</div>
            <data-summary description="Max reps last session" :value="maxRepsLastSession.reps"/>
          </el-tooltip>
        </div>
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
    estOneRepMax: {type: Number, required: true},
    isBodyWeight: {type: Boolean, default: false}
  },
  computed: {
    maxResistance() {
      return this.exercise.maxResistance();
    },
    maxResistanceLastSession() {
      return this.exercise.maxResistanceLastSession();
    },
    maxReps() {
      return this.exercise.maxReps();
    },
    maxRepsLastSession() {
      return this.exercise.maxRepsLastSession();
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

.exercise-summary {
  color: $white;
  background: url("../../assets/images/pullup-dark-1366.jpg") no-repeat center -180px;
  background-size: cover;
  margin: 0 1em;
  h2 {
    color: $white;
  }
  @include drop-shadow;
}
.extra-padded {
  padding: 0 1em;
}
.summary-items {
  display: flex;
  justify-content: space-around;
  &> div {
    margin-bottom: $normal-space * 2;
  }
}
@media only screen and (max-width: 990px) {
  .exercise-summary {
    background: url("../../assets/images/plate-step-dark-1000.jpg") no-repeat center center;
    height: 100%;
    position: relative;
    margin: 0;
    background-size: cover;
  }
  .summary-items {
    justify-content: space-between;
  }
}
@media only screen and (max-width: 600px) {
  background: url("../../assets/images/plate-step-dark-600.jpg") no-repeat center center;
  background-size: cover;
}
@media only screen and (max-width: 400px) {
  background: url("../../assets/images/plate-step-dark-400.jpg") no-repeat center center;
  background-size: cover;
}
</style>

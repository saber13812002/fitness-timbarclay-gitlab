<template>
  <div>
    <el-row class="space">
      <el-col :xs="24" :md="12">
        <label>1 Rep Max
          <el-input v-model="oneRepMaxWeight" type="number" placeholder="1 Rep Max weight">
            <el-select v-model="exerciseId" placeholder="Choose exercise" filterable default-first-option slot="append" clearable>
              <el-option v-for="exercise in exerciseSuggestions" :key="exercise.id" :label="exercise.name" :value="exercise.id"/>
            </el-select>
          </el-input>
        </label>
      </el-col>
    </el-row>
    
    <el-row class="space">
      <el-col :xs="24" :md="12">
        <label>Percentage
          <el-slider
            v-model="percentage"
            :step="5"
            :min="50"
            :max="100"
            show-stops>
          </el-slider>
        </label>
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :sm="12" :md="6">
        <radial :percentage="percentage">
          <div class="result-display" v-if="result">
            <div class="details">{{percentage}}% of {{renderWeight(oneRepMaxWeight)}}</div>
            <div class="result">
              <span v-if="result">{{result}}</span>
              <span v-else>---</span>
            </div>
          </div>
        </radial>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _round from "lodash/round";
import _sortBy from "lodash/sortBy";
import _find from "lodash/find";
import Radial from "../Radial.vue";
import {renderWeight} from "../../application/resistanceHelpers";

export default {
  props: {
    exercises: {type: Array, required: true},
    oneRepMax: {type: Object, required: true},
    weightUnit: {type: Object, required: true}
  },
  data() {
    return {
      oneRepMaxWeight: null,
      exerciseId: null,
      percentage: 80,
      percentSuggestions: [90, 85, 80, 75, 70, 65, 60]
    }
  },
  mounted() {
    const first1RM = this.exerciseSuggestions[0];
    if(first1RM) {
      this.exerciseId = first1RM.id;
    } else {
      this.oneRepMaxWeight = 50;
    }
  },
  computed: {
    result() {
      return this.oneRepMaxWeight && this.percentage ? renderWeight(_round(this.percentage / 100 * this.oneRepMaxWeight, 1)) : null;
    },
    exerciseSuggestions() {
      return this.exercises
        .filter(e => e.maxResistance().resistance > 0)
        .map(e => {
          const oneRepMax = _round(e.maxOneRepMax(this.oneRepMax.calculate()));
          return {
            name: `${e.name} (${renderWeight(oneRepMax)})`,
            id: e.name,
            oneRepMax: this.weightUnit.calculate()(oneRepMax)
          }
        });
    },
    exercise() {
      return _find(this.exerciseSuggestions, e => e.id === this.exerciseId);
    }
  },
  watch:{
    exercise(exercise) {
      if(exercise) {
        this.oneRepMaxWeight = _round(exercise.oneRepMax, 1);
      }
    },
    oneRepMaxWeight(weight) {
      if(this.exercise && _round(this.exercise.oneRepMax, 1) !== _round(weight, 1)) {
        this.exerciseId = null;
      }
    }
  },
  components: {
    Radial
  },
  methods:{
    renderWeight: renderWeight
  }
}
</script>

<style lang="scss">
.result-display {
  .details {
    font-size: 1.5em;
    line-height: 1em;
  }
  .result {
    font-size: 3em;
    line-height: 1em;
  }
}
.el-input .el-input-group__append {
  width: 40%;
}
</style>


<template>
  <div>
    <el-row class="space">
      <el-col :xs="24" :md="6">
        <label>1 Rep Max
          <!-- <el-input type="number" placeholder="1 Rep Max" v-model="oneRepMaxWeight"/> -->
          <el-select v-model.number="oneRepMaxWeight"  placeholder="1 Rep Max" filterable allow-create default-first-option>
            <el-option v-for="exercise in exerciseSuggestions" :key="exercise.name" :label="exercise.name" :value="exercise.oneRepMax"/>
          </el-select>
        </label>
      </el-col>

      <el-col :xs="24" :md="6">
        <label>Percentage
          <el-select v-model.number="percentage" placeholder="Percentage" filterable allow-create default-first-option>
            <el-option v-for="percent in percentSuggestions" :key="percent" :label="percent" :value="percent"/>
          </el-select>
        </label>
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :md="6">
        <radial v-if="result" :percentage="percentage">{{result}}</radial>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _round from "lodash/round";
import _sortBy from "lodash/sortBy";
import Radial from "../Radial.vue";

export default {
  props: {
    exercises: {type: Array, required: true},
    oneRepMax: {type: Object, required: true},
    weightUnit: {type: Object, required: true}
  },
  data() {
    return {
      oneRepMaxWeight: null,
      percentage: 80,
      percentSuggestions: [90, 85, 80, 75, 70, 65, 60]
    }
  },
  computed: {
    result() {
      return this.oneRepMaxWeight && this.percentage ? _round(this.percentage / 100 * this.oneRepMaxWeight, 1) : null;
    },
    exerciseSuggestions() {
      return this.exercises.map(e => {
        const oneRepMax = _round(e.maxOneRepMax(this.oneRepMax.calculate()));
        return {
          name: `${e.name} (${oneRepMax})`,
          oneRepMax: oneRepMax
        }
      })
    }
  },
  components: {
    Radial
  }
}
</script>

<style>

</style>

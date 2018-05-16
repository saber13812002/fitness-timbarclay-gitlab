<template>
  <el-card>
    <h4>Summary</h4>
    <div>
      <el-tooltip :content="formatSetDate(maxResistance)">
        <span>Max resistance: {{renderWeight(maxResistance.resistance)}} ({{maxResistance.reps}} reps)</span>
      </el-tooltip>
    </div>
    <div>Max last session: {{renderWeight(maxResistanceLastSession.resistance)}} ({{maxResistanceLastSession.reps}} reps)</div>
    <div>
      <el-tooltip>
        <div slot="content">Estimated using {{oneRepMax.name}}. Change this in <a href="/settings">settings</a></div><!-- Not quite sure why I can't use a router-link here but it gives an error -->
        <span>Estimated 1 rep max: {{renderWeight(estOneRepMax)}}</span>
      </el-tooltip>
    </div>
  </el-card>
</template>

<script>
import moment from "moment";
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
  }
}
</script>

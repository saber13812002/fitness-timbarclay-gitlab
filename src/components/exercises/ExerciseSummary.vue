<template>
  <el-card>
    <div>
      <el-tooltip :content="formatSetDate(maxResistance)">
        <span>Max resistance: {{maxResistance.resistance}}kg ({{maxResistance.reps}} reps)</span>
      </el-tooltip>
    </div>
    <div>Max last session: {{maxResistanceLastSession.resistance}}kg ({{maxResistanceLastSession.reps}} reps)</div>
    <div>
      <el-tooltip>
        <div slot="content">Estimated using {{oneRepMax.name}}. Change this in <a href="/settings">settings</a></div><!-- Not quite sure why I can't use a router-link here but it gives an error -->
        <span>Estimated 1 rep max: {{estOneRepMax}}kg</span>
      </el-tooltip>
    </div>
  </el-card>
</template>

<script>
import moment from "moment";

export default {
  props: {
    exercise: {type: Object, required: true},
    oneRepMax: {type: Object, required: true}
  },
  computed: {
    maxResistance() {
      return this.exercise.maxResistance();
    },
    maxResistanceLastSession() {
      return this.exercise.maxResistanceLastSession();
    },
    estOneRepMax() {
      return Math.round(this.exercise.maxOneRepMax(this.oneRepMax.calculate));
    }
  },
  methods: {
    formatSetDate(set) {
      return moment(set.start).format("dddd Do MMMM YYYY");
    }
  }
}
</script>

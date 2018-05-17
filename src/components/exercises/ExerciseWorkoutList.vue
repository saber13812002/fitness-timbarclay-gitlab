<template>
  <div>
    <card v-for="session in reversedSessions" :key="session.session.id">
      <div>{{sessionStart(session)}}</div>
      <span v-for="set in session.sets" :key="set.id" class="set-summary">
        <el-tooltip placement="top">
          <div slot="content">
            <div>Weight: {{resistance(set)}}</div>
            <div>Reps: {{set.reps}}</div>
            <div>Volume load: {{volumeLoad(set)}}</div>
            <div>Time: {{time(set)}}</div>
            <div>Duration: {{duration(set)}} seconds</div>
            <div>% of 1 rep max: {{percentOneRepMax(set)}}</div>
          </div>
          <el-tag>{{resistance(set)}} x {{set.reps}}</el-tag>
        </el-tooltip>
      </span>
    </card>
  </div>
</template>

<script>
import Card from "../Card.vue";
import {Set} from "../../application/models/Set";
import _sortBy from "lodash/sortBy";
import _round from "lodash/round";
import * as metrics from "../../application/models/IntensityMetrics";
import {renderWeight} from "../../application/resistanceHelpers";
import {mapGetters} from "vuex";
import moment from "moment";

export default {
  props: {
    exercise: {type: Object, required: true}
  },
  computed: {
    reversedSessions() {
      return _sortBy(this.exercise.sessions, s => -s.session.start);
    },
    ...mapGetters([
      "oneRepMax",
      "weightUnit"
    ]),
    maxOneRepMax() {
      return this.exercise.maxOneRepMax(this.oneRepMax.calculate());
    }
  },
  components: {
    Card
  },
  methods: {
    sessionStart(session) {
      return moment(session.session.start).format("Do MMM YY");
    },
    time(set) {
      return moment(set.start).format("h:mm:ss a");
    },
    resistance(set) {
      return renderWeight(set.resistance);
    },
    duration(set) {
      return _round(set.duration / 1000);
    },
    percentOneRepMax(set) {
      return _round((set.resistance / this.maxOneRepMax) * 100);
    },
    volumeLoad(set) {
      const load = metrics.volumeLoad.calculate()(set, this.weightUnit);
      return `${_round(load, 1)}${metrics.volumeLoad.units(this.weightUnit)}`;
    }
  }
}
</script>

<style>
.set-summary {
  margin-right: 0.5em;
}
</style>

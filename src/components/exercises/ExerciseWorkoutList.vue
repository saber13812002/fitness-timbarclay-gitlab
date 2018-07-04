<template>
  <div>
    <el-card v-for="session in reversedSessions" :key="session.session.id" class="space">
      <h4 class="no-top">{{sessionStart(session)}}</h4>
      
      <span v-for="set in session.sets" :key="set.id" class="set-summary">
        <el-popover placement="top" trigger="hover">
          <table>
            <tr><td>Weight</td><td>{{resistance(set)}}</td></tr>
            <tr><td>Reps</td><td>{{set.reps}}</td></tr>
            <tr><td>Volume load</td><td>{{volumeLoad(set)}}</td></tr>
            <tr><td>Time</td><td>{{time(set)}}</td></tr>
            <tr><td>Duration</td><td>{{duration(set)}} seconds</td></tr>
            <tr><td>% of 1 rep max</td><td>{{percentOneRepMax(set)}}</td></tr>
          </table>
          <div slot="reference">{{resistance(set)}} x {{set.reps}}</div>
        </el-popover>
      </span>
    </el-card>

    <div class="center-content">
      <el-button type="info" v-on:click="loadMore">Load more</el-button>
    </div>
  </div>
</template>

<script>
import {Set} from "../../application/models/Set";
import _sortBy from "lodash/sortBy";
import _round from "lodash/round";
import * as metrics from "../../application/models/IntensityMetrics";
import {renderWeight} from "../../application/resistanceHelpers";
import {mapGetters} from "vuex";
import mutations from "../../vuex/mutations";
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
  methods: {
    sessionStart(session) {
      return moment(session.session.start).format("dddd Do MMMM YYYY");
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
    },
    loadMore() {
      this.$store.commit(mutations.PUSH_DATE);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.set-summary {
  display: inline-block;
  font-size: 0.8em;
  padding: 0.4em 0.8em;
  margin: 0 4px 4px 0;
  border-radius: 16px;
  background-color: $primary-brand;
  color: $white;
  cursor: default;
}
</style>

<template>
  <div>
    <card v-for="session in reversedSessions" :key="session.session.id">
      <div>{{sessionStart(session)}}</div>
      <span v-for="set in session.sets" :key="set.id" class="set-summary">
        <el-tooltip :content="setTooltip(set)" effect="dark" placement="top">
          <el-tag>{{set.resistance}}kg x {{set.reps}}</el-tag>
        </el-tooltip>
      </span>
    </card>
  </div>
</template>

<script>
import Card from "../Card.vue";
import _sortBy from "lodash/sortBy";
import moment from "moment";

export default {
  props: {
    exercise: {type: Object, required: true}
  },
  computed: {
    reversedSessions() {
      return _sortBy(this.exercise.sessions, s => -s.session.start);
    }
  },
  components: {
    Card
  },
  methods: {
    sessionStart(session) {
      return moment(session.session.start).format("Do MMM YY");
    },
    setTooltip(set) {
      // TODO remove moment from here
      return `${moment(set.start).format("h:mm:ss a")}, duration: ${Math.round(set.duration / 1000)} seconds`;
    }
  }
}
</script>

<style>
.set-summary {
  margin-right: 0.5em;
}
</style>

<template>
  <div class="padded">
    <div v-if="orderedExercises.length">
      <card-link v-for="exercise in orderedExercises" :to="exerciseLink(exercise)" :key="exercise.name">
        <el-row><h3 class="no-top">{{exercise.name}}</h3></el-row>
        <el-row>
          <div class="exercise-stats">
            <div>{{numberOfSessions(exercise)}}</div>
            <div><i class="fas fa-dumbbell" /> Max weight: {{maxResistance(exercise)}}</div>
            <div><!-- More stats --></div>
          </div>
        </el-row>
      </card-link>
    </div>
    <div v-else>
      There doesn't seem to be anything here.
    </div>
  </div>
</template>

<script>
import CardLink from "../CardLink.vue";
import {renderWeight} from "../../application/resistanceHelpers";
import {mapGetters, mapState} from "vuex";
import _sortBy from "lodash/sortBy";
import moment from "moment";

export default {
  computed: {
    ...mapState({
      loadingSessions: state => state.exercise.loadingSessions,
      loadingSets: state => state.exercise.loadingSets,
      start: state => state.dates.start,
      end: state => state.dates.end
    }),
    ...mapGetters([
      "exercises"
    ]),
    orderedExercises() {
      return _sortBy(this.exercises, e => e.name);
    }
  },
  components: {
    CardLink
  },
  methods: {
    exerciseLink(exercise) {
      return {
        name: "exercise",
        params: {name: exercise.name}
      }
    },
    formatDate(date) {
      return moment(date).format("Do MMMM YYYY"); // TODO remove moment from here
    },
    numberOfSessions(exercise) {
      return `${exercise.sessions.length} sessions`;
    },
    maxResistance(exercise) {
      const max = exercise.maxResistance();
      return max ? renderWeight(max.resistance) : "";
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.exercise-stats {
  font-size: 0.7em;
  color: $regular-text;
  display: flex;
  justify-content: space-between;
}
</style>

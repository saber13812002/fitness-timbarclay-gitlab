<template>
  <div>
    <el-table :data="sets" class="set-table">
      <el-table-column
        prop="start"
        label="Time"
        sortable
        :formatter="formatTime">
      </el-table-column>
      <el-table-column
        label="Exercise"
        prop="exerciseName"
        sortable
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <router-link :to="linkTo(scope.row)">
            {{scope.row.exerciseName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="reps"
        label="Reps"
        sortable/>
      <el-table-column
        prop="resistance"
        label="Resistance (kg)"
        sortable/>
      <el-table-column
        prop="duration"
        label="Duration (seconds)"
        :formatter="formatDuration"
        sortable/>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    sets: {type: Array, default: () => []}
  },
  methods: {
    formatDuration(set) {
      return set.end.diff(set.start, "seconds");
    },

    formatTime(set) {
      return set.start.format("h:mm:ss a")
    },

    linkTo(set) {
      return {
        name: "exercise",
        params: {
          name: set.exerciseName
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.set-table {
  width: 100%;
  .cell a {
    color: $regular-text;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

@media only screen and (max-width: 990px) {
  .sets-table {
    font-size: 0.9em;
  }
}
</style>

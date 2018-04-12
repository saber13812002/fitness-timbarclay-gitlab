<template>
  <div>
    <el-table :data="sets" style="width:100%">
      <el-table-column
        prop="exerciseName"
        label="Exercise"/>
      <el-table-column
        prop="reps"
        label="Reps"/>
      <el-table-column
        prop="resistance"
        label="Resistance"/>
      <el-table-column
        prop="duration"
        label="Duration (seconds)"
        :formatter="formatDuration"/>
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
    }
  }
}
</script>

<style>

</style>

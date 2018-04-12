<template>
  <div>
    <div v-if="loading"></div>

    <div v-else-if="!sets.length">There doesn't seem to be anything here</div>

    <div v-else>
      <h2>{{session.session.name}}</h2>
      <span>{{session.session.start.format("dddd Do MMM YYYY, h:mm a")}}</span>
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
  </div>
</template>

<script>
export default {
  props: {
    session: {type: Object, required: false},
    loading: {type: Boolean, default: false}
  },
  computed: {
    sets() {
      return this.session.sets || [];
    }
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

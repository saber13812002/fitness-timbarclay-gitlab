<template>
  <el-row class="home">
    <el-col :xs="24" :md="6">
      Menu or something here probably
    </el-col>
    <el-col :xs="24" :md="18">
      <date-picker />

      <dates-container :start="start" :end="end">
        <fitness-container>
          <router-view></router-view>
        </fitness-container>
      </dates-container>
    </el-col>
  </el-row>
</template>

<script>
import DatePicker from "../components/DatePicker.vue";
import FitnessContainer from "../components/fitness/FitnessContainer.vue";
import SessionsList from "../components/sessions/SessionsList.vue";
import DatesContainer from "../components/dates/DatesContainer.vue";

export default {
  name: 'home',
  props: {
    start: {type: String, required: false},
    end: {type: String, required: false}
  },
  components: {
    DatePicker,
    FitnessContainer,
    SessionsList,
    DatesContainer
  }
}
</script>

<style lang="scss">
@import "../sass/variables";

.home {
  padding-top: $nav-height + 20px;
}
</style>

<template>
  <el-row class="home">
    <el-col :xs="24" :md="6" class="sidebar">
      <side-menu/>
    </el-col>
    <el-col :xs="24" :md="18" class="main-content">
      <div class="date-picker">
        <date-picker />
      </div>

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
import SideMenu from "../components/navbar/SideMenu.vue";

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
    DatesContainer,
    SideMenu
  },

}
</script>

<style lang="scss">
@import "../sass/variables";

.home {
  padding-top: $nav-height + 20px;
  max-width: 1470px;
  margin: 0 auto;
}
.sidebar {
  padding: 1em;
}
.main-content {
  padding: 1em 1em 2em 1em;
  position: relative;
}
.date-picker {
  margin-bottom: 1em;
  text-align: center;
}
</style>

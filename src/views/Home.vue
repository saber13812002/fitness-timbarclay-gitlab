<template>
  <div>
    <div class="date-picker">
      <date-picker />
    </div>

    <dates-container :start="start" :end="end">
      <fitness-container>
        <router-view></router-view>
      </fitness-container>
    </dates-container>
  </div>
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
  },

}
</script>

<style lang="scss">
@import "../sass/variables";

.date-picker {
  margin-bottom: $normal-space;
  text-align: center;
}
</style>

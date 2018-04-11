<template>
  <el-row class="home">
    <el-col :xs="24" :md="6">
      Menu or something here probably
    </el-col>
    <el-col :xs="24" :md="18">
      <date-picker />

      <fitness-container />
    </el-col>
  </el-row>
</template>

<script>
import DatePicker from "../components/DatePicker.vue";
import FitnessContainer from "../components/fitness/FitnessContainer.vue";
import mutations from "../vuex/mutations";
import {isValidDate} from "../application/timeHelpers";
import {mapGetters} from "vuex";
import _ from "lodash";

export default {
  name: 'home',
  props: {
    start: {type: String, required: false},
    end: {type: String, required: false}
  },
  computed: {
    ...mapGetters([
      "dates"
    ])
  },
  watch: {
    dates(dates) {
      const query = _.assign({}, this.$route.query, {
        start: dates[0].toISOString(),
        end: dates[1].toISOString()
      });
      this.$router.push({query});
    },
    start() {
      this.commitDates();
    },
    end() {
      this.commitDates();
    }
  },
  mounted() {
    this.commitDates();
  },
  components: {
    DatePicker,
    FitnessContainer
  },
  methods: {
    commitDates() {
      if(isValidDate(this.start) && isValidDate(this.end)) {
        const dates = [new Date(this.start), new Date(this.end)];
        this.$store.commit(mutations.SET_DATES, {dates});
      }
    }
  }
}
</script>

<style lang="scss">
@import "../sass/variables";

.home {
  padding-top: $nav-height + 20px;
}
</style>

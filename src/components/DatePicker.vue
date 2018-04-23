<template>
  <div class="date-container">
    <div class="el-input"><date-time :value="startString" :auto="true" input-class="el-input__inner" v-on:input="updateStart"/></div>
    <div class="el-input"><date-time :value="endString" :auto="true" input-class="el-input__inner" v-on:input="updateEnd"/></div>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import mutations from "../vuex/mutations";
import {Datetime} from "vue-datetime";

export default {
  components: {
    "date-time": Datetime
  },
  computed: {
    ...mapState({
      start: state => state.dates.start,
      end: state => state.dates.end
    }),
    startString() {
      return this.start.toISOString ? this.start.toISOString() : null;
    },
    endString() {
      return this.end.toISOString ? this.end.toISOString() : null;
    }
  },
  methods: {
    onInput(dates) {
      this.$store.commit(mutations.SET_DATES, {dates});
    },
    updateStart(date) {
      this.onInput([new Date(date), this.end]);
    },
    updateEnd(date) {
      this.onInput([this.start, new Date(date)]);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";

.date-container {
  .el-input {
    width: 10em;
    margin: 0 ($normal-space / 2);
  }
}

@media only screen and (max-width: 990px) {
  .date-container {
    .el-input {
      width: 50%;
      margin: 0;
    }
  }
}
</style>

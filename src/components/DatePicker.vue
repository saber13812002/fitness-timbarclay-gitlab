<template>
  <el-date-picker
    :value="dates"
    v-on:input="onInput"
    type="daterange"
    align="right"
    unlink-panels
    range-separator="To"
    start-placeholder="Start date"
    end-placeholder="End date"
    format="dd/MM/yyyy"
    :clearable="false"
    :picker-options="pickerOptions2"
    :default-time="['00:00:00', '23:59:59']">
  </el-date-picker>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import mutations from "../vuex/mutations";

export default {
  data() {
    return {
      pickerOptions2: {
        shortcuts: [{
          text: 'Last week',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last month',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last 3 months',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    };
  },
  computed: {
    ...mapGetters([
      "dates"
    ])
  },
  methods: {
    onInput(dates) {
      this.$store.commit(mutations.SET_DATES, {dates});
    }
  }
}
</script>

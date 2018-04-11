<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import mutations from "../../vuex/mutations";
import {isValidDate} from "../../application/timeHelpers";
import {mapGetters} from "vuex";
import _ from "lodash";
import moment from "moment";

export default {
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
    dates() {
      const query = this.getQueryWithDates();
      this.$router.push({query});
    },
    start() {
      this.commitDates();
    },
    end() {
      this.commitDates();
    },
    "$route"(route) {
      const {start, end} = route.query;
      if(!(start && end)) {
        const query = this.getQueryWithDates();
        this.$router.replace({query});
      }
    }
  },
  mounted() {
    this.commitDates();
  },
  methods: {
    commitDates() {
      if(isValidDate(this.start) && isValidDate(this.end)) {
        const currentStart = this.dates[0];
        const currentEnd = this.dates[1];
        const start = new Date(this.start);
        const end = new Date(this.end);
        if(!(moment(currentStart).isSame(start) && moment(currentEnd).isSame(end))) {
          const dates = [start, end];
          this.$store.commit(mutations.SET_DATES, {dates});  
        }
      }
    },

    getQueryWithDates() {
      return _.assign({}, this.$route.query, {
        start: this.dates[0].toISOString(),
        end: this.dates[1].toISOString()
      })
    }
  }
}
</script>

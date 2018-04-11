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

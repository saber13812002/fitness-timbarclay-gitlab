<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import mutations from "../../vuex/mutations";
import {isValidDate} from "../../application/timeHelpers";
import {mapGetters} from "vuex";
import moment from "moment";

export default {
  props: {
    start: {type: String, required: false}
  },
  computed: {
    ...mapGetters([
      "dates"
    ])
  },
  watch: {
    /* dates() {
      const query = this.getQueryWithDates();
      this.$router.push({query});
    }, */
    start() {
      this.commitDates();
    },
    /* "$route"(route) {
      const {start} = route.query;
      if(!start) {
        const query = this.getQueryWithDates();
        this.$router.replace({query});
      }
    } */
  },
  mounted() {
    this.commitDates();
  },
  methods: {
    commitDates() {
      if(isValidDate(this.start)) {
        const currentStart = this.dates[0];
        const startDate = new Date(this.start);
        // TODO remove moment from here
        if(!(moment(currentStart).isSame(startDate))) {
          this.$store.commit(mutations.SET_DATE, {startDate});  
        }
      }
    },

    getQueryWithDates() {
      return Object.assign({}, this.$route.query, {
        start: this.dates[0].toISOString()
      })
    }
  }
}
</script>

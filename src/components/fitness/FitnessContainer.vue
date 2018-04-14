<template>
  <div>
    <div class="refresh-button">
      <div class="hidden-sm-and-down">
        <div class="last-request" v-if="lastRequest">
          Last refreshed {{timeSinceLoad}}
        </div>
        <el-button v-on:click="fetchData" type="primary" round><i class="el-icon-refresh"/> Refresh</el-button>
      </div>
      <div class="hidden-md-and-up">
        <el-button v-on:click="fetchData" type="primary" round><i class="el-icon-refresh"/></el-button>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import SessionsList from "../sessions/SessionsList.vue";
import {mapState, mapGetters} from "vuex";
import actions from "../../vuex/actions";
import moment from "moment";

export default {
  computed: {
    ...mapState({
      sessions: state => state.exercise.sessions,
      loadingSessions: state => state.exercise.loadingSessions,
      lastRequest: state => state.exercise.lastRequest
    }),
    ...mapGetters([
      "dates"
    ]),
    timeSinceLoad() {
      if(!this.lastRequest) return "";
      return moment(this.lastRequest).from(moment(this.now));
    }
  },
  data() {
    return {
      now: new Date()
    }
  },
  mounted() {
    setInterval(() => this.now = new Date(), 500);
  },
  watch: {
    dates: {
      handler: "fetchData",
      immediate: true
    }
  },
  components: {
    SessionsList
  },
  methods: {
    fetchData() {
      this.$store.dispatch(actions.FETCH_SESSIONS);
      this.$store.dispatch(actions.FETCH_SETS);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.refresh-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
}
.last-request {
  display: inline-block;
  font-size: 0.6em;
  font-style: italic;
  margin-right: 1em;
  width: 10em;
  text-align: right;
  color: $secondary-text;
}

@media only screen and (max-width: 990px) {
  $button-size: 4em;

  .refresh-button {
    position: fixed;
    top: calc(100vh - 6em - #{$normal-space});
    right: $normal-space;
    z-index: 10;
    .el-button {
      border-radius: 50%;
      height: $button-size;
      width: $button-size;
      text-align: center;
      padding: 0;
    }
  }
}
</style>

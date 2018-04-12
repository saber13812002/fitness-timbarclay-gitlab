<template>
  <div>
    <div v-if="loadingSessions">Loading</div>
    <div v-else class="session-list-container">
      <h2>Sessions from {{formatDate(start)}} to {{formatDate(end)}}</h2>
      <router-link class="session-box" v-for="session in sessions" :to="sessionLink(session)" :key="session.id">
        <div class="date">
          <span>{{session.start.format("Do MMM")}}</span>
        </div>
        <div class="session-detail">
          {{session.name}}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import moment from "moment";

export default {
  computed: {
    ...mapState({
      sessions: state => state.exercise.sessions,
      loadingSessions: state => state.exercise.loadingSessions,
      start: state => state.dates.start,
      end: state => state.dates.end
    }),
    reversedSessions() {
      return this.sessions.reverse();
    }
  },
  methods: {
    sessionLink(session) {
      return {
        name: "session",
        params: { id: session.id }
      }
    },
    formatDate(date) {
      return moment(date).format("Do MMM YY");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

$ball-size: 6em;
$line-width: 2px;
$space-between: 1em;

.session-list-container {
  width: 50em;
}

.session-box {
  display: flex;
  color: $primary-text;
  margin: $space-between 0;
  position: relative;
  text-decoration: none;
  .date {
    display: inline-block;
    min-height: $ball-size;
    min-width: $ball-size;
    border-radius: 50%;
    background-color: $warning;
    margin-right: $space-between;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .session-detail {
    display: inline-block;
    height: calc(#{$ball-size} - $space-between);
    width: 100%;
    background-color: $base-border;
    padding: $space-between;
    position: relative;
  }
}

.session-box:hover {
  .date {
    background-color: darken($warning, 10%);
    box-shadow: $placeholder-text ($space-between / 2) ($space-between / 2) 0 0;
  }
  .session-detail {
    box-shadow: $placeholder-text ($space-between / 2) ($space-between / 2) 0 0;
  }
}

.session-box:not(:last-child) .date:after {
  content: '';
  width: $line-width;
  height: $space-between;
  background-color: black;
  display: block;
  position: absolute;
  bottom: -$space-between;
  left: calc(#{$ball-size / 2} - #{$line-width / 2});
}
</style>

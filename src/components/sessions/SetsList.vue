<template>
  <table class="set-table">
    <thead>
      <tr>
        <th>Exercise</th>
        <th>Reps</th>
        <th>Resistance</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(set, i) in sets" :key="set.id" :class="{duplicate: isDuplicate(set, i)}">
        <td>
          <router-link :to="linkTo(set)">{{formatName(set, i)}}</router-link>
        </td>
        <td>{{set.reps}}</td>
        <td>{{resistance(set)}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from "moment";
import {renderWeight} from "../../application/resistanceHelpers";

export default {
  props: {
    sets: {type: Array, default: () => []}
  },
  methods: {
    formatName(set, index) {
      return this.isDuplicate(set, index) ? "" : set.exerciseName;
    },

    isDuplicate(set, index) {
      if(index === 0) return false;
      return set.exerciseName === this.sets[index - 1].exerciseName;
    },
    
    formatDuration(set) {
      return moment(set.end).diff(moment(set.start), "seconds");
    },
    
    resistance(set) {
      return renderWeight(set.resistance);
    },

    linkTo(set) {
      return {
        name: "exercise",
        params: {
          name: set.exerciseName
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

table.set-table {
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: $primary-text;
    color: $white;
  }
  tr {
    line-height: 2.2em;
    td, th {
      text-align: left;
      padding: 4px 1em;
      a {
        color: $regular-text;
        text-decoration: none;
        padding-bottom: 0.1em;
        border-bottom: 1px solid $secondary-text;
        &:hover {
          border-color: red;
        }
      }
    }
  }
  tr:not(.duplicate) {
    td {
      border-top: $base-border 1px solid;
    }
  }
}

@media only screen and (max-width: 990px) {
  .sets-table {
    font-size: 0.9em;
  }
}
</style>

<template>
  <vue-apex-charts height="300" type="line" :options="options" :series="series"></vue-apex-charts>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import * as metrics from "../../application/models/IntensityMetrics";
import _round from "lodash/round";
import Vue from "vue";

export default {
  props: {
    workoutSessions: {type: Array, default: () => []},
    oneRepMax: {type: Number, required: true},
    weightUnit: {type: Object, required: true},
    statsType: {type: Object, required: true}
  },
  data() {
    return {
      configs: [
        {
          metric: metrics.resistance,
          type: "line",
          colour: "#2BA9FF"
        },
        {
          metric: metrics.volumeLoad,
          type: "line",
          colour: "#46237A"
        },
        {
          metric: metrics.repCount,
          type: "column",
          colour: "#3DDC97"
        }
      ]
    }
  },
  computed: {
    series() {
      return this.configs.map(config => {
        return {
          name: config.metric.name,
          type: config.type,
          data: this.workoutSessions.map(session => {
            return [
              session.session.start,
              this.calculate(session, config.metric)
            ]
          })
        }
      });
    },

    yaxis() {
      return this.configs.map((config, i) => {
        return {
          opposite: i % 2 !== 0,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: config.colour
          },
          labels: {
            style: {
              color: config.colour
            }
          },
          title: {
            text: config.metric.name
          }
        }
      }).slice(0, 2); // We're not going to show a y axis for the reps columns
    },
    
    options() {
      return {
        chart: {
          height: 300,
          width: "100%",
          type: 'line',
          stacked: false,
        },
        colors: this.configs.map(c => c.colour),
        stroke: {
          width: [2, 2, 2, 2],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '30%'
          }
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: this.yaxis
      }
    }
  },
  components: {
    VueApexCharts
  },
  methods: {
    calculate(workout, intensityMetric) {
      const value = workout.reduceSets(intensityMetric.calculate(this.oneRepMax), this.statsType.calculate(), this.weightUnit);
      return _round(this.weightUnit.calculate()(value), 1);
    }
  }
}
</script>

<style>

</style>

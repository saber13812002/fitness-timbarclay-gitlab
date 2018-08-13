<template>
  <vue-apex-charts height="300" type="line" :options="options" :series="series"></vue-apex-charts>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import * as metrics from "../../application/models/IntensityMetrics";
import _round from "lodash/round";
import _assign from "lodash/assign";
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
          metric: metrics.repCount,
          type: "column",
          colour: "#3DDC97",
          show: false
        },
        {
          metric: metrics.resistance,
          type: "line",
          colour: "#2BA9FF",
          show: true
        },
        {
          metric: metrics.volumeLoad,
          type: "line",
          colour: "#46237A",
          show: true
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
          opposite: i % 2 === 0,
          axisTicks: {
            show: config.show
          },
          axisBorder: {
            show: config.show,
            color: config.colour
          },
          labels: {
            show: config.show,
            style: {
              color: config.colour
            }
          },
          title: {
            text: config.show ? config.metric.name : ""
          }
        }
      })
    },

    yaxisSmall() {
      return this.yaxis.map(() => {
        return {
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          },
          labels: {
            show: false
          }
        }
      })
    },
    
    options() {
      return {
        chart: {
          height: 300,
          width: "100%",
          type: 'line',
          stacked: false
        },
        colors: this.configs.map(c => c.colour),
        stroke: {
          width: [2, 2],
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
        yaxis: this.yaxis,
        
        responsive: [{
          breakpoint: 999,
          options: {
            yaxis: this.yaxisSmall
          }
        }]
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

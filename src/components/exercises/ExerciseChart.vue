<template>
  <vue-apex-charts height="300" :type="options.chart.type" :options="options" :series="series"></vue-apex-charts>
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
    statsType: {type: Object, required: true},
    isBodyWeight: {type: Boolean, default: false}
  },
  data() {
    const configs = !this.isBodyWeight ?
      [
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
          show: true,
          opposite: true
        }
      ] :
      [
        {
          metric: metrics.repCount,
          type: "column",
          colour: "#3DDC97",
          show: true
        }
      ]
    
    return {configs};
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
          opposite: config.opposite,
          floating: !config.show,
          axisTicks: {
            show: config.show
          },
          axisBorder: {
            show: false,
          },
          labels: {
            show: config.show,
            formatter: value => Math.floor(value),
            style: {
              color: config.colour,
              fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
              fontSize: "12px"
            }
          },
          title: {
            text: config.show ? config.metric.name : "",
            style: {
              fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
              fontSize: "12px"
            }
          }
        }
      })
    },

    yaxisSmall() {
      return this.yaxis.map(() => {
        return {
          floating: true,
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
          type: this.isBodyWeight ? 'bar' : 'line',
          stacked: false,
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 500,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
          }
        },
        colors: this.configs.map(c => c.colour),
        stroke: {
          width: [2, 2, 2],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '30%'
          }
        },
        tooltip: {
          followCursor: false,
          x: {
            format: "ddd d MMMM"
          }
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false
          },
          labels: {
            style: {
              fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
              fontSize: "12px"
            }
          }
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
      return _round(value, 1);
    }
  }
}
</script>

<style lang="scss">
.apexcharts-tooltip {
  background-color: black
}
</style>


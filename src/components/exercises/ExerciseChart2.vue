<template>
  <div class="chart"></div>
</template>

<script>
import ApexCharts from "apexcharts";
import * as metrics from "../../application/models/IntensityMetrics";
import _round from "lodash/round";

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
          colour: "#46237A",
          opposite: true
        },
        {
          metric: metrics.repCount,
          type: "column",
          colour: "#3DDC97"
        }
      ]
    }
  },
  watch: {
    workoutSessions: {
      handler: "setupChart",
      immediate: true
    },
    statsType() {
      this.setupChart()
    }
  },
  methods: {
    setupChart() {
      const series = this.configs.map(config => {
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

      const yaxis = this.configs.map(config => {
        return {
          opposite: !!config.opposite,
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

      const options = {
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
        series,
        xaxis: {
          type: 'datetime'
        },
        yaxis
      }
    
      const chart = new ApexCharts(this.$el, options);
      
      chart.render();
    },
    calculate(workout, intensityMetric) {
      const value = workout.reduceSets(intensityMetric.calculate(this.oneRepMax), this.statsType.calculate(), this.weightUnit);
      return _round(this.weightUnit.calculate()(value), 1);
    }
  }
}
</script>

<style>

</style>

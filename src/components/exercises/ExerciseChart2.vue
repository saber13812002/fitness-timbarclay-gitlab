<template>
  <div class="chart"></div>
</template>

<script>
import ApexCharts from "apexcharts";

export default {
  props: {
    workoutSessions: {type: Array, default: () => []},
    options: {type: Object, required: true}
  },
  watch: {
    workoutSessions: {
      handler: "setupChart",
      immediate: true
    },
    options() {
      this.setupChart(this.workoutSessions)
    }
  },
  methods: {
    setupChart(data) {
      const name = this.options.intensity.name;
      const units = this.options.intensity.units(this.options.weightUnit);
      
      const mapped = data.map(row => {
        return [
          row.session.start,
          this.options.calculate(row)
        ]
      });

      const options = {
        chart: {
          height: 300,
          width: "100%",
          type: 'line',
          //stacked: false,
        },
        colors:['#FF3B3F', '#2BA9FF', '#46237A', '#3DDC97'],
        /* dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 3,
          opacity: 0.5
        }, */
        stroke: {
          //width: [0, 2, 5],
          curve: 'smooth'
        },
        /* animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }, */
        plotOptions: {
          bar: {
            columnWidth: '10%'
          }
        },
        series: [
          {
            name,
            type: "line",
            data: mapped
          },
          {
            name,
            type: "column",
            data: mapped
          }
        ],
        yaxis: {
          labels: {
            formatter(value) {
              return `${value}${units}`;
            }
          },
        },
        xaxis: {
          type: 'datetime'
        }
      }
    
      const chart = new ApexCharts(this.$el, options);
      
      chart.render();
    }
  }
}
</script>

<style>

</style>

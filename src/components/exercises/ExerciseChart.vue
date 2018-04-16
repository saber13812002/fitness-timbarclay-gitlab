<template>
  <div id='chart-element'></div>
</template>

<script>
import * as d3 from "d3";
import * as fc from "d3fc";

export default {
  props: {
    workoutSessions: {type: Array, default: () => {}},
    getIntensity: {type: Function, required: true}
  },
  mounted() {
    this.setupChart(this.workoutSessions);
  },
  watch: {
    workoutSessions(sessions) {
      this.setupChart(sessions);
    }
  },
  methods: {
    setupChart(data) {
      var point = fc.seriesSvgPoint()
        .size(20)
        .crossValue(d => d.date)
        .mainValue(d => d.intensity);

      const lineSeries = fc.seriesSvgLine()
        .mainValue(d => d.intensity)
        .crossValue(d => d.date);

      var pointLineSeries = fc.seriesSvgMulti()
        .series([point, lineSeries]);

      const xExtent = fc.extentDate()
        .accessors([d => d.date]);

      const yExtent = fc.extentLinear()
        .pad([0.1, 0.1])
        .accessors([d => d.intensity]);

      const parseDate = d3.timeParse("%d-%b-%y");

      const mapped = data.map(row => {
        return {
          intensity: this.getIntensity(row),
          date: row.session.start.toDate()
        }
      });

      const chart = fc.chartSvgCartesian(
            d3.scaleTime(),
            d3.scaleLinear()
          )
        .yOrient('left')
        .yLabel("Intensity")
        .xLabel("Date")
        .plotArea(pointLineSeries)
        .xDomain(xExtent(mapped))
        .yDomain(yExtent(mapped))

      d3.select('#chart-element')
        .datum(mapped)
        .call(chart);
    }
  }
}
</script>

<style lang="scss">
@import "../../sass/variables";

.line {
  stroke: $primary-brand;
  stroke-width: 2px;
}
.point {
  fill: $primary-brand;
  stroke: $primary-brand;
}
</style>


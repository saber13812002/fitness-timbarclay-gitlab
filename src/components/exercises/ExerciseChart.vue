<template>
  <div id='chart-element' style='height: 500px'></div>
</template>

<script>
import {Set} from "../../application/models/Set";
import * as d3 from "d3";
import * as fc from "d3fc";

export default {
  props: {
    workoutSessions: {type: Array, default: () => {}}
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
      const lineSeries = fc.seriesSvgLine()
        .mainValue(d => d.intensity)
        .crossValue(d => d.date);

      const chart = fc.chartSvgCartesian(
          d3.scaleTime(),
          d3.scaleLinear()
        )
        .yOrient('left')
        .plotArea(lineSeries);

      const xExtent = fc.extentDate()
        .accessors([d => d.date]);

      const yExtent = fc.extentLinear()
        .accessors([d => d.intensity]);

      const parseDate = d3.timeParse("%d-%b-%y");

      const mapped = data.map(row => {
        return {
          intensity: Set.volumeLoad(row.maxSessionIntensity(Set.volumeLoad)),
          date: row.session.start.toDate()
        }
      });

      chart.xDomain(xExtent(mapped))
        .yDomain(yExtent(mapped))

      d3.select('#chart-element')
        .datum(mapped)
        .call(chart);
    }
  }
}
</script>

<style lang="scss">
.chart {
  height: 480px;
}
.line {
  stroke: purple;
}
.area {
  fill: lightgreen;
  fill-opacity: 0.5;
}

</style>


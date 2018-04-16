<template>
  <div id='chart-element'></div>
</template>

<script>
import * as d3 from "d3";
import * as fc from "d3fc";
import moment from "moment";
import Vue from "vue";

// This will hold a reference to the tooltip div. It doesn't need to be reactive, so we'll keep it outside the vue model
let tooltipDiv;

export default {
  props: {
    workoutSessions: {type: Array, default: () => {}},
    getIntensity: {type: Function, required: true}
  },
  watch: {
    workoutSessions: {
      handler: "setupChart",
      immediate: true
    },
    getIntensity() {
      this.setupChart(this.workoutSessions)
    }
  },
  mounted() {
    tooltipDiv = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  },
  destroyed() {
    d3.select(".tooltip").remove();
  },
  methods: {
    setupChart(data) {
      // A series of points that won't show up on the chart but are there as a hover target for the tooltips
      const hoverPoint = fc.seriesSvgPoint()
        .size(80)
        .crossValue(d => d.date)
        .mainValue(d => d.intensity)
        .decorate(selection => {
          selection.enter()
            .attr("class", "hover-point")
            .on("mouseover", d => {
              tooltipDiv
                .transition()
                .duration(200)
                .style("opacity", 1);
              tooltipDiv
                .html(`${moment(d.date).format("dddd, Do MMMM YY")}<br/>${d.intensity}kg`)
                .style("left", `${d3.event.pageX - 80}px`)
                .style("top", `${d3.event.pageY - 80}px`);
            })
            .on("mouseout", d => {
              tooltipDiv
                .transition()
                .duration(200)
                .style("opacity", 0);
            });
        });

      const visiblePoint = fc.seriesSvgPoint()
        .size(20)
        .crossValue(d => d.date)
        .mainValue(d => d.intensity);

      const lineSeries = fc.seriesSvgLine()
        .mainValue(d => d.intensity)
        .crossValue(d => d.date);

      const pointLineSeries = fc.seriesSvgMulti()
        .series([lineSeries, visiblePoint, hoverPoint]);

      const xExtent = fc.extentDate()
        .accessors([d => d.date]);

      const yExtent = fc.extentLinear()
        .pad([0.1, 0.1])
        .accessors([d => d.intensity]);

      const mapped = data.map(row => {
        return {
          intensity: this.getIntensity(row),
          date: row.session.start.toDate()
        }
      });

      const chart = fc.chartSvgCartesian(d3.scaleTime(), d3.scaleLinear())
        .yOrient('left')
        .yLabel("Intensity")
        .xLabel("Date")
        .plotArea(pointLineSeries)
        .xDomain(xExtent(mapped))
        .yDomain(yExtent(mapped))

      Vue.nextTick(() => 
        d3.select('#chart-element')
          .datum(mapped)
          .transition()
          .duration(500)
          .call(chart));
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
.hover-point {
  fill: transparent;
  stroke: transparent;
}
div.tooltip {	
  position: absolute;
  text-align: left;
  padding: $small-space;
  background: $primary-text;
  color: $white;
  font-size: 0.8em;
  border: 0px;
  border-radius: $box-corner-radius;
  pointer-events: none;
  @include drop-shadow;
}
</style>


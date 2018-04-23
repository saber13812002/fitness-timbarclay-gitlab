<template>
  <div id='chart-element'></div>
</template>

<script>
import {select, event as d3Event} from "d3-selection";
import {scaleTime, scaleLinear} from "d3-scale";
import {transition} from 'd3-transition';
import {seriesSvgPoint, seriesSvgLine, seriesSvgMulti} from "d3fc-series";
import {chartSvgCartesian} from "d3fc-chart";
import {extentLinear, extentDate} from "d3fc-extent";
import "d3fc-element";
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
    tooltipDiv = select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  },
  destroyed() {
    select(".tooltip").remove();
  },
  methods: {
    setupChart(data) {
      // A series of points that won't show up on the chart but are there as a hover target for the tooltips
      const hoverPoint = seriesSvgPoint()
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
                .html(`${moment(d.date).format("dddd, Do MMMM YY")}<br/>${d.intensity}kg`) // TODO remove moment from here
                .style("left", `${d3Event.pageX - 80}px`)
                .style("top", `${d3Event.pageY - 80}px`);
            })
            .on("mouseout", d => {
              tooltipDiv
                .transition()
                .duration(200)
                .style("opacity", 0);
            });
        });

      const visiblePoint = seriesSvgPoint()
        .size(20)
        .crossValue(d => d.date)
        .mainValue(d => d.intensity);

      const lineSeries = seriesSvgLine()
        .mainValue(d => d.intensity)
        .crossValue(d => d.date);

      const pointLineSeries = seriesSvgMulti()
        .series([lineSeries, visiblePoint, hoverPoint]);

      const xExtent = extentDate()
        .accessors([d => d.date]);

      const yExtent = extentLinear()
        .pad([0.1, 0.1])
        .accessors([d => d.intensity]);

      const mapped = data.map(row => {
        return {
          intensity: this.getIntensity(row),
          date: new Date(row.session.start)
        }
      });

      const chart = chartSvgCartesian(scaleTime(), scaleLinear())
        .yOrient('left')
        .yLabel("Intensity")
        .xLabel("Date")
        .plotArea(pointLineSeries)
        .xDomain(xExtent(mapped))
        .yDomain(yExtent(mapped))

      Vue.nextTick(() => 
        select('#chart-element')
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


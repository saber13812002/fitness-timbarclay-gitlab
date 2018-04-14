<template>
  <div>
    <!-- <div class="complete-chart chart"></div> -->
    <div id="sine" style="width: 100%; height: 250px"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as fc from "d3fc";

export default {
  data() {
    // a random number generator
    var generator = fc.randomGeometricBrownianMotion()
        .steps(11);
    const dateFormatter = d3.timeFormat("%b");
    return {
      data: {
        // target values for the annotations
        targets: [{
          name: "low",
          value: 4.5
        }, {
          name: "high",
          value: 7.2
        }],
        // randomly generated sales data
        sales: generator(1).map(function(d, i) {
          return {
            month: dateFormatter(new Date(0, i + 1, 0)),
            sales: d + i / 2
          };
        })
      },
      data2: d3.range(50).map((d) => ({
          x: d / 4,
          y: Math.sin(d / 4),
          z: Math.cos(d / 4) * 0.7
      }))
    }
  },
  mounted() {
    //this.setUpChart(this.data);
    this.setUpOtherChart(this.data2);
  },
  methods: {
    setUpOtherChart(data) {
      // use d3fc-extent to compute the domain for each axis
      var xExtent = fc.extentLinear()
        .accessors([d => d.x]);
      var yExtent = fc.extentLinear()
        .accessors([d => d.y, d => d.z])
        .pad([0.1, 0.1])

      // gridlines (from d3fc-annotation)
      var gridlines = fc.annotationSvgGridline();
      // series (from d3fc-series)
      var line = fc.seriesSvgLine();

      // combine into a single series
      var multi = fc.seriesSvgMulti()
        .series([gridlines, line]);

      // the Cartesian component, which uses d3fc-element for layout
      // of the standard features of a chart (axes, labels, plot area)
      var chart = fc.chartSvgCartesian(
          d3.scaleLinear(),
          d3.scaleLinear()
        )
        .xLabel('Value')
        .yLabel('Sine / Cosine')
        .chartLabel('Sine and Cosine')
        .yDomain(yExtent(data))
        .xDomain(xExtent(data))
        .plotArea(multi);

      // render
      d3.select('#sine')
        .datum(data)
        .call(chart);
    },
    
    setUpChart(data) {
      // some formatters
      var valueformatter = d3.format("$.0f");

      var yExtent = fc.extentLinear()
          .include([0])
          .pad([0, 0.5])
          .accessors([function(d) { return d.sales; }]);

      var chart = fc.chartSvgCartesian(
              d3.scaleBand(),
              d3.scaleLinear())
          .chartLabel("2015 Cumulative Sales")
          .xDomain(data.sales.map(function(d) { return d.month; }))
          .yDomain(yExtent(data.sales))
          .xPadding(0.2)
          .yTicks(5)
          .yTickFormat(valueformatter)
          .yLabel("Sales (millions)")
          .yNice();

      // START
      var bar = fc.autoBandwidth(fc.seriesSvgBar())
        .crossValue(function(d) { return d.month; })
        .mainValue(function(d) { return d.sales; })
        .align("left")
        .decorate(function(selection) {
          // The selection passed to decorate is the one which the component creates
          // within its internal data join, here we use the update selection to
          // apply a style to "path" elements created by the bar series
          selection.select(".bar > path")
            .style("fill", function(d) {
              return d.sales < data.targets[0].value ? "inherit" : "#0c0";
            });
        });
      // END

      var annotation = fc.annotationSvgLine()
          .value(function(d) { return d.value; })
          .decorate(function(selection) {
            selection.enter()
              .select("g.left-handle")
              .append("text")
              .attr("x", 5)
              .attr("y", -5);
            selection.select("g.left-handle text")
              .text(function(d) {
                return d.name + " - " + valueformatter(d.value) + "M";
              });
          });

      var multi = fc.seriesSvgMulti()
          .series([bar, annotation])
          .mapping(function(data, index, series) {
            switch (series[index]) {
            case bar:
              return data.sales;
            case annotation:
              return data.targets;
            }
          });

      chart.plotArea(multi);

      d3.selectAll(".complete-chart")
          .datum(this.data)
          .transition()
          .call(chart);
    }
  }
}
</script>

<style lang="scss">
/* .chart-label {
  font-size: 1.5em;
  line-height: normal;
  color: black;
}

.chart {
  margin: 10px 0;
  width: 100%;
  height: 250px;
}

.chart svg {
  overflow: visible !important;
}

.chart.large {
  height: 400px;
}

.plot-area {
  background-color: white;
}

.y-axis-label {
  white-space: nowrap;
}
.bar {
  fill: #9cf;
  stroke-width: 0;
}

.plot-area {
  background-color: white;
  overflow: hidden;
}

d3fc-svg svg {
  overflow: visible !important;
}

.annotation-line > line {
  fill-opacity: 0;
  stroke: #999;
  stroke-width: 1;
  stroke-dasharray: 3, 3;
} */

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


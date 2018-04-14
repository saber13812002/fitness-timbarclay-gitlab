<template>
  <div>
    <!-- <div class="complete-chart chart"></div> -->
    <!-- <div id="sine" style="width: 100%; height: 250px"></div> -->
    <div id='chart-element' style='height: 500px'></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as fc from "d3fc";

export default {
  props: {
    exercise: {type: Object, required: true}
  },
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
      })),
      data3: [
        {Date: "9-Jun-14", Open: 62.40, High: 63.34, Low: 61.79, Close: 62.88, Volumens: 37617413},
{Date: "6-Jun-14", Open: 63.37, High: 63.48, Low: 62.15, Close: 62.50, Volumens: 42442096},
{Date: "5-Jun-14", Open: 63.66, High: 64.36, Low: 62.82, Close: 63.19, Volumens: 47352368},
{Date: "4-Jun-14", Open: 62.45, High: 63.59, Low: 62.07, Close: 63.34, Volumens: 36513991},
{Date: "3-Jun-14", Open: 62.62, High: 63.42, Low: 62.32, Close: 62.87, Volumens: 32216707},
{Date: "2-Jun-14", Open: 63.23, High: 63.59, Low: 62.05, Close: 63.08, Volumens: 35995537},
{Date: "30-May-14", Open: 63.95, High: 64.17, Low: 62.56, Close: 63.30, Volumens: 45283577},
{Date: "29-May-14", Open: 63.84, High: 64.30, Low: 63.51, Close: 63.83, Volumens: 42699670},
{Date: "28-May-14", Open: 63.39, High: 64.14, Low: 62.62, Close: 63.51, Volumens: 47795088},
{Date: "27-May-14", Open: 61.62, High: 63.51, Low: 61.57, Close: 63.48, Volumens: 55681663},
{Date: "23-May-14", Open: 60.41, High: 61.45, Low: 60.15, Close: 61.35, Volumens: 38293993},
{Date: "22-May-14", Open: 60.94, High: 61.48, Low: 60.40, Close: 60.52, Volumens: 54200116},
{Date: "21-May-14", Open: 58.56, High: 60.50, Low: 58.25, Close: 60.49, Volumens: 58991505},
{Date: "20-May-14", Open: 59.50, High: 60.19, Low: 58.18, Close: 58.56, Volumens: 53931469},
{Date: "19-May-14", Open: 57.89, High: 59.56, Low: 57.57, Close: 59.21, Volumens: 43033925},
{Date: "16-May-14", Open: 58.31, High: 58.45, Low: 57.31, Close: 58.02, Volumens: 47933075},
{Date: "15-May-14", Open: 59.26, High: 59.38, Low: 57.52, Close: 57.92, Volumens: 56813940},
{Date: "14-May-14", Open: 59.53, High: 60.45, Low: 58.95, Close: 59.23, Volumens: 47428583},
{Date: "13-May-14", Open: 59.66, High: 60.89, Low: 59.51, Close: 59.83, Volumens: 48525476},
{Date: "12-May-14", Open: 57.98, High: 59.90, Low: 57.98, Close: 59.83, Volumens: 48575487},
{Date: "9-May-14", Open: 56.85, High: 57.65, Low: 56.38, Close: 57.24, Volumens: 52583858},
{Date: "8-May-14", Open: 57.23, High: 58.82, Low: 56.50, Close: 56.76, Volumens: 61251053},
{Date: "7-May-14", Open: 58.77, High: 59.30, Low: 56.26, Close: 57.39, Volumens: 78587247},
{Date: "6-May-14", Open: 60.98, High: 61.15, Low: 58.49, Close: 58.53, Volumens: 55900809},
{Date: "5-May-14", Open: 59.67, High: 61.35, Low: 59.18, Close: 61.22, Volumens: 46057411},
{Date: "2-May-14", Open: 61.30, High: 61.89, Low: 60.18, Close: 60.46, Volumens: 54189197},
{Date: "1-May-14", Open: 60.43, High: 62.28, Low: 60.21, Close: 61.15, Volumens: 82428606},
{Date: "30-Apr-14", Open: 57.58, High: 59.85, Low: 57.16, Close: 59.78, Volumens: 76093004},
{Date: "29-Apr-14", Open: 56.09, High: 58.28, Low: 55.84, Close: 58.15, Volumens: 75557202},
{Date: "28-Apr-14", Open: 58.05, High: 58.31, Low: 54.66, Close: 56.14, Volumens: 107757756},
{Date: "25-Apr-14", Open: 59.97, High: 60.01, Low: 57.57, Close: 57.71, Volumens: 92501529},
{Date: "24-Apr-14", Open: 63.60, High: 63.65, Low: 59.77, Close: 60.87, Volumens: 138769345},
{Date: "23-Apr-14", Open: 63.45, High: 63.48, Low: 61.26, Close: 61.36, Volumens: 96564750},
{Date: "22-Apr-14", Open: 62.65, High: 63.44, Low: 62.22, Close: 63.03, Volumens: 60631312},
{Date: "21-Apr-14", Open: 59.46, High: 61.24, Low: 59.15, Close: 61.24, Volumens: 60363619},
{Date: "17-Apr-14", Open: 59.30, High: 60.58, Low: 58.72, Close: 58.94, Volumens: 88040346},
{Date: "16-Apr-14", Open: 59.79, High: 60.19, Low: 57.74, Close: 59.72, Volumens: 78773521},
{Date: "15-Apr-14", Open: 59.29, High: 59.68, Low: 55.88, Close: 59.09, Volumens: 108622706},
{Date: "14-Apr-14", Open: 60.09, High: 60.45, Low: 57.78, Close: 58.89, Volumens: 72324603},
{Date: "11-Apr-14", Open: 57.60, High: 60.31, Low: 57.31, Close: 58.53, Volumens: 91451960},
{Date: "10-Apr-14", Open: 63.08, High: 63.18, Low: 58.68, Close: 59.16, Volumens: 114987616},
{Date: "9-Apr-14", Open: 59.63, High: 62.46, Low: 59.19, Close: 62.41, Volumens: 100215307},
{Date: "8-Apr-14", Open: 57.68, High: 58.71, Low: 57.17, Close: 58.19, Volumens: 78835935},
{Date: "7-Apr-14", Open: 55.90, High: 58.00, Low: 55.44, Close: 56.95, Volumens: 108487569},
{Date: "4-Apr-14", Open: 59.94, High: 60.20, Low: 56.32, Close: 56.75, Volumens: 125465774},
{Date: "3-Apr-14", Open: 62.55, High: 63.17, Low: 59.13, Close: 59.49, Volumens: 83859330},
{Date: "2-Apr-14", Open: 63.21, High: 63.91, Low: 62.21, Close: 62.72, Volumens: 66276613},
{Date: "1-Apr-14", Open: 60.46, High: 62.66, Low: 60.24, Close: 62.62, Volumens: 59291210},
{Date: "31-Mar-14", Open: 60.78, High: 61.52, Low: 59.87, Close: 60.24, Volumens: 53011205},
{Date: "28-Mar-14", Open: 61.34, High: 61.95, Low: 59.34, Close: 60.01, Volumens: 67051528},
{Date: "27-Mar-14", Open: 60.51, High: 61.90, Low: 57.98, Close: 60.97, Volumens: 112649694},
{Date: "26-Mar-14", Open: 64.74, High: 64.95, Low: 60.37, Close: 60.38, Volumens: 97689774},
{Date: "25-Mar-14", Open: 64.89, High: 66.19, Low: 63.78, Close: 64.89, Volumens: 68785500},
{Date: "24-Mar-14", Open: 67.19, High: 67.36, Low: 63.36, Close: 64.10, Volumens: 85695872},
{Date: "21-Mar-14", Open: 67.53, High: 67.92, Low: 66.18, Close: 67.24, Volumens: 60041228},
{Date: "20-Mar-14", Open: 68.01, High: 68.23, Low: 66.82, Close: 66.97, Volumens: 44438500},
{Date: "19-Mar-14", Open: 69.17, High: 69.29, Low: 67.46, Close: 68.24, Volumens: 43980558},
{Date: "18-Mar-14", Open: 68.76, High: 69.60, Low: 68.30, Close: 69.19, Volumens: 40827226},
{Date: "17-Mar-14", Open: 68.18, High: 68.95, Low: 66.62, Close: 68.74, Volumens: 52196699},
{Date: "14-Mar-14", Open: 68.49, High: 69.43, Low: 67.46, Close: 67.72, Volumens: 48226824},
{Date: "13-Mar-14", Open: 71.29, High: 71.35, Low: 68.15, Close: 68.83, Volumens: 57091157},
{Date: "12-Mar-14", Open: 69.86, High: 71.35, Low: 69.00, Close: 70.88, Volumens: 46400431},
{Date: "11-Mar-14", Open: 72.50, High: 72.59, Low: 69.96, Close: 70.10, Volumens: 59615238},
{Date: "10-Mar-14", Open: 70.77, High: 72.15, Low: 70.51, Close: 72.03, Volumens: 59949746},
{Date: "7-Mar-14", Open: 71.08, High: 71.18, Low: 69.47, Close: 69.80, Volumens: 38985763},
{Date: "6-Mar-14", Open: 71.88, High: 71.89, Low: 70.25, Close: 70.84, Volumens: 46126260},
{Date: "5-Mar-14", Open: 69.69, High: 71.97, Low: 69.62, Close: 71.57, Volumens: 74649486},
{Date: "4-Mar-14", Open: 68.66, High: 68.90, Low: 67.62, Close: 68.80, Volumens: 42164222},
{Date: "3-Mar-14", Open: 66.96, High: 68.05, Low: 66.51, Close: 67.41, Volumens: 56900444},
{Date: "28-Feb-14", Open: 69.47, High: 69.88, Low: 67.38, Close: 68.46, Volumens: 66900863},
{Date: "27-Feb-14", Open: 69.34, High: 70.01, Low: 68.87, Close: 68.94, Volumens: 41695855},
{Date: "26-Feb-14", Open: 70.19, High: 71.22, Low: 68.85, Close: 69.26, Volumens: 55400399},
{Date: "25-Feb-14", Open: 70.95, High: 71.00, Low: 69.45, Close: 69.85, Volumens: 52189031},
{Date: "24-Feb-14", Open: 68.74, High: 71.44, Low: 68.54, Close: 70.78, Volumens: 76951946},
{Date: "21-Feb-14", Open: 69.69, High: 69.96, Low: 68.45, Close: 68.59, Volumens: 70991892},
{Date: "20-Feb-14", Open: 67.73, High: 70.11, Low: 65.73, Close: 69.63, Volumens: 131043748},
{Date: "19-Feb-14", Open: 67.05, High: 69.08, Low: 67.00, Close: 68.06, Volumens: 64258631},
{Date: "18-Feb-14", Open: 66.94, High: 67.54, Low: 66.07, Close: 67.30, Volumens: 43862297},
{Date: "14-Feb-14", Open: 67.50, High: 67.58, Low: 66.72, Close: 67.09, Volumens: 36786427},
{Date: "13-Feb-14", Open: 64.18, High: 67.33, Low: 64.05, Close: 67.33, Volumens: 62013396},
{Date: "12-Feb-14", Open: 64.92, High: 65.06, Low: 64.05, Close: 64.45, Volumens: 47409857},
{Date: "11-Feb-14", Open: 63.75, High: 65.00, Low: 63.35, Close: 64.85, Volumens: 45746832},
{Date: "10-Feb-14", Open: 64.30, High: 64.49, Low: 63.47, Close: 63.55, Volumens: 43736562},
{Date: "7-Feb-14", Open: 62.27, High: 64.57, Low: 62.22, Close: 64.32, Volumens: 60835746},
{Date: "6-Feb-14", Open: 61.46, High: 62.78, Low: 61.46, Close: 62.16, Volumens: 42153754},
{Date: "5-Feb-14", Open: 62.74, High: 63.16, Low: 61.27, Close: 62.19, Volumens: 53032420},
{Date: "4-Feb-14", Open: 62.05, High: 63.14, Low: 61.82, Close: 62.75, Volumens: 46064897},
{Date: "3-Feb-14", Open: 63.03, High: 63.77, Low: 60.70, Close: 61.48, Volumens: 75105994},
{Date: "31-Jan-14", Open: 60.47, High: 63.37, Low: 60.17, Close: 62.57, Volumens: 87930298},
{Date: "30-Jan-14", Open: 62.12, High: 62.50, Low: 60.46, Close: 61.08, Volumens: 150438699},
{Date: "29-Jan-14", Open: 54.61, High: 54.95, Low: 53.19, Close: 53.53, Volumens: 98089932},
{Date: "28-Jan-14", Open: 54.02, High: 55.28, Low: 54.00, Close: 55.14, Volumens: 48364998},
{Date: "27-Jan-14", Open: 54.73, High: 54.94, Low: 51.85, Close: 53.55, Volumens: 74142331},
{Date: "24-Jan-14", Open: 56.15, High: 56.42, Low: 54.40, Close: 54.45, Volumens: 55545338},
{Date: "23-Jan-14", Open: 56.37, High: 56.68, Low: 55.69, Close: 56.63, Volumens: 47996403},
{Date: "22-Jan-14", Open: 58.85, High: 59.31, Low: 57.10, Close: 57.51, Volumens: 61495880},
{Date: "21-Jan-14", Open: 56.60, High: 58.58, Low: 56.50, Close: 58.51, Volumens: 48734147},
{Date: "17-Jan-14", Open: 57.30, High: 57.82, Low: 56.07, Close: 56.30, Volumens: 40883205},
{Date: "16-Jan-14", Open: 57.26, High: 58.02, Low: 56.83, Close: 57.19, Volumens: 34599775},
{Date: "15-Jan-14", Open: 57.98, High: 58.57, Low: 57.27, Close: 57.60, Volumens: 33730619},
{Date: "14-Jan-14", Open: 56.46, High: 57.78, Low: 56.10, Close: 57.74, Volumens: 37590987},
{Date: "13-Jan-14", Open: 57.91, High: 58.25, Low: 55.38, Close: 55.91, Volumens: 63106519},
{Date: "10-Jan-14", Open: 57.13, High: 58.30, Low: 57.06, Close: 57.94, Volumens: 42529258},
{Date: "9-Jan-14", Open: 58.65, High: 58.96, Low: 56.65, Close: 57.22, Volumens: 92349222},
{Date: "8-Jan-14", Open: 57.60, High: 58.41, Low: 57.23, Close: 58.23, Volumens: 56800776},
{Date: "7-Jan-14", Open: 57.70, High: 58.55, Low: 57.22, Close: 57.92, Volumens: 77329009},
{Date: "6-Jan-14", Open: 54.42, High: 57.26, Low: 54.05, Close: 57.20, Volumens: 68974359},
{Date: "3-Jan-14", Open: 55.02, High: 55.65, Low: 54.53, Close: 54.56, Volumens: 38287706},
{Date: "2-Jan-14", Open: 54.83, High: 55.22, Low: 54.19, Close: 54.71, Volumens: 43257622},
{Date: "31-Dec-13", Open: 54.12, High: 54.86, Low: 53.91, Close: 54.65, Volumens: 43152127},
{Date: "30-Dec-13", Open: 54.93, High: 55.18, Low: 53.43, Close: 53.71, Volumens: 68307317},
{Date: "27-Dec-13", Open: 57.48, High: 57.68, Low: 55.25, Close: 55.44, Volumens: 60465751},
{Date: "26-Dec-13", Open: 58.32, High: 58.38, Low: 57.37, Close: 57.73, Volumens: 55101367},
{Date: "24-Dec-13", Open: 58.27, High: 58.58, Low: 56.91, Close: 57.96, Volumens: 46617754},
{Date: "23-Dec-13", Open: 55.50, High: 58.32, Low: 55.45, Close: 57.77, Volumens: 98296983},
{Date: "20-Dec-13", Open: 54.91, High: 55.15, Low: 54.23, Close: 55.12, Volumens: 239823912},
{Date: "19-Dec-13", Open: 54.34, High: 55.19, Low: 53.95, Close: 55.05, Volumens: 89825393},
{Date: "18-Dec-13", Open: 55.57, High: 55.89, Low: 53.75, Close: 55.57, Volumens: 76003479},
{Date: "17-Dec-13", Open: 54.75, High: 55.18, Low: 54.24, Close: 54.86, Volumens: 78751463},
{Date: "16-Dec-13", Open: 53.27, High: 54.50, Low: 52.91, Close: 53.81, Volumens: 85118518},
{Date: "13-Dec-13", Open: 51.61, High: 53.50, Low: 51.34, Close: 53.32, Volumens: 82640992},
{Date: "12-Dec-13", Open: 51.03, High: 52.07, Low: 50.66, Close: 51.83, Volumens: 92723034},
{Date: "11-Dec-13", Open: 50.56, High: 50.77, Low: 49.01, Close: 49.38, Volumens: 65776366},
{Date: "10-Dec-13", Open: 48.62, High: 50.77, Low: 48.54, Close: 50.24, Volumens: 68478561},
{Date: "9-Dec-13", Open: 48.06, High: 48.97, Low: 47.74, Close: 48.84, Volumens: 36055891},
{Date: "6-Dec-13", Open: 48.98, High: 49.39, Low: 47.71, Close: 47.94, Volumens: 42937659},
{Date: "5-Dec-13", Open: 48.15, High: 48.70, Low: 47.87, Close: 48.34, Volumens: 43855036},
{Date: "4-Dec-13", Open: 46.46, High: 48.77, Low: 46.26, Close: 48.62, Volumens: 60890176},
{Date: "3-Dec-13", Open: 46.75, High: 47.20, Low: 46.29, Close: 46.73, Volumens: 32085905},
{Date: "2-Dec-13", Open: 46.90, High: 47.54, Low: 46.26, Close: 47.06, Volumens: 50773647},
{Date: "29-Nov-13", Open: 46.75, High: 47.21, Low: 46.50, Close: 47.01, Volumens: 22953916},
{Date: "27-Nov-13", Open: 45.97, High: 46.67, Low: 45.53, Close: 46.49, Volumens: 44993195},
{Date: "26-Nov-13", Open: 44.66, High: 46.17, Low: 43.55, Close: 45.89, Volumens: 82016490},
{Date: "25-Nov-13", Open: 46.36, High: 46.65, Low: 44.04, Close: 44.82, Volumens: 82565324},
{Date: "22-Nov-13", Open: 47.04, High: 47.27, Low: 45.96, Close: 46.23, Volumens: 40545375},
      ]
    }
  },
  mounted() {
    //this.setUpChart(this.data);
    //this.setUpOtherChart(this.data2);
    this.setUp3(this.data3);
  },
  methods: {
    setUp3(data) {
      const lineSeries = fc.seriesSvgLine()
        .mainValue(d => d.close)
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
        .accessors([d => d.high, d => d.low]);

      const parseDate = d3.timeParse("%d-%b-%y");

      const mapped = data.map(row => ({
        open: row.Open,
        close: row.Close,
        high: row.High,
        low: row.Low,
        date: parseDate(row.Date)
      }));

      chart.xDomain(xExtent(mapped))
        .yDomain(yExtent(mapped))

      d3.select('#chart-element')
        .datum(mapped)
        .call(chart);
    },

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


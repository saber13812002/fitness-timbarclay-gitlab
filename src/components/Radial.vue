<template>
  <div class="radial-container" :style="{width: size + 'px', height: size + 'px'}">
    <svg :width="size" :height="size"></svg>
    <div v-if="showText" class="radial-inner">
      <slot>
        <span class="inner-text">{{textToShow}}</span>
      </slot>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

const tau = 2 * Math.PI;

export default {
  props: {
    percentage: {type: Number, required: true},
    text: {type: String, required: false},
    showText: {type: Boolean, default: true},
    size: {type: Number, default: 200},
    lineWidth: {type: Number, default: 10}
  },
  data() {
    return {
      arc: null,
      foreground: null
    }
  },
  computed: {
    textToShow() {
      return this.text || `${this.percentage}%`;
    }
  },
  mounted() {
    this.setupChart();
  },
  methods: {
    setupChart() {
      const outer = this.size / 2;
      const inner = outer - this.lineWidth;
      
      // Method gratefully stolen from http://bl.ocks.org/mbostock/5100636
      this.arc = d3.arc()
        .innerRadius(inner)
        .outerRadius(outer)
        .startAngle(0);

      const svg = d3.select(this.$el.querySelector("svg"));
      const g = svg.append("g").attr("transform", "translate(" + this.size / 2 + "," + this.size / 2 + ")");

      const background = g.append("path")
          .datum({endAngle: tau})
          .classed("background-path", true)
          .attr("d", this.arc);

      this.foreground = g.append("path")
          .datum({endAngle: 0.127 * tau})
          .classed("foreground-path", true)
          .attr("d", this.arc);

      this.update(this.percentage);
    },

    update(percentage) {
      const arc = this.arc;
      
      this.foreground.transition()
          .duration(750)
          .attrTween("d", arcTween((percentage / 100) * tau));

      function arcTween(newAngle) {
        return function(d) {
          var interpolate = d3.interpolate(d.endAngle, newAngle);
          return function(t) {
            d.endAngle = interpolate(t);
            return arc(d);
          };
        };
      }
    }
  }
}
</script>

<style lang="scss">
@import "../sass/variables";
.background-path {
  fill: $base-border;
}
.foreground-path {
  fill: $primary-brand;
}
</style>

<style lang="scss" scoped>
.radial-container {
  position: relative;

  .radial-inner {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .inner-text {
      font-size: 3em;
    }
  }
}
</style>

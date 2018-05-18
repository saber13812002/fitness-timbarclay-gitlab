<template>
  <intensity-calculator-form :exercises="exercises" :one-rep-max="oneRepMax" :weight-unit="weightUnit"/>
</template>

<script>
import IntensityCalculatorForm from "./IntensityCalculatorForm.vue";
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters([
      "exercises",
      "oneRepMax",
      "weightUnit"
    ])
  },
  components: {
    IntensityCalculatorForm
  }
}
</script>

<template>
  <div>
    <h3>Units</h3>
    <el-row>
      <el-col :xs="24" :md="8">
        <label>Weight unit</label> <transition name="fade"><span v-if="weightUnitSaved" class="saved-notifier"> <i class="el-icon-circle-check"></i> Saved</span></transition>
        <el-select :value="weightUnitId" v-on:input="setWeightUnit">
          <el-option v-for="unit in weightUnitOptions" :key="unit.id" :value="unit.id" :label="`${unit.name} (${unit.unit})`" />
        </el-select>
      </el-col>
    </el-row>
    
    <h3>1 Rep Max</h3>
    <p class="setting-description">Superset is able to estimate your 1 Rep Max for an exercise based on the sets you've recorded. There are a number of different formulae in use for estimating 1RM. You can choose which you would like to use here</p>
    <el-row>
      <el-col :xs="24" :md="8">
        <label>Preferred 1RM formula</label> <transition name="fade"><span v-if="oneRepMaxSaved" class="saved-notifier"> <i class="el-icon-circle-check"></i> Saved</span></transition>
        <el-select :value="oneRepMaxId" v-on:input="set1RepMax">
          <el-option v-for="max in oneRepMaxOptions" :key="max.id" :value="max.id" :label="max.name" />
        </el-select>
      </el-col>
      <el-col :xs="24" :md="16">
        <div>
          <label>Selected:</label>
        </div>
        {{oneRepMax.name}}: <span class="setting-description">{{oneRepMax.formulaText}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as oneRepMax from "../../application/models/OneRepMax";
import * as units from "../../application/models/Units";
import mutations from "../../vuex/mutations";
import {mapState, mapGetters} from "vuex";

export default {
  data() {
    return {
      weightUnitOptions: units.all,
      weightUnitSaved: false,
      
      oneRepMaxOptions: oneRepMax.all,
      oneRepMaxSaved: false
    }
  },
  computed: {
    ...mapGetters([
      "weightUnit",
      "oneRepMax"
    ]),
    ...mapState({
      weightUnitId: state => state.settings.weightUnitId,
      oneRepMaxId: state => state.settings.oneRepMaxId,
    })
  },
  watch: {
    weightUnitId() {
      this.weightUnitSaved = true;
      setTimeout(() => this.weightUnitSaved = false, 2000);
    },
    oneRepMaxId() {
      this.oneRepMaxSaved = true;
      setTimeout(() => this.oneRepMaxSaved = false, 2000);
    }
  },
  methods: {
    setWeightUnit(weightUnitId) {
      this.$store.commit(mutations.SET_WEIGHT_UNIT, {weightUnitId});
    },
    
    set1RepMax(oneRepMaxId) {
      this.$store.commit(mutations.SET_1_REP_MAX, {oneRepMaxId});
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";

.setting-description {
  font-size: 0.8em;
  font-style: italic;
}
.saved-notifier {
  font-size: 0.7em;
  font-size: italic;
  color: $success;
  display: inline-block;
  margin-left: $small-space;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.el-select {
  display: block;
}
</style>

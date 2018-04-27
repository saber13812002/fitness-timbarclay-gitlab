<template>
  <div>
    <h3>1 Rep Max</h3>
    <p class="setting-description">Superset is able to estimate your 1 Rep Max for an exercise based on the sets you've recorded. There are a number of different formulae in use for estimating 1RM. You can choose which you would like to use here</p>
    <el-row>
      <el-col :xs="24" :md="8">
        <label>Preferred 1RM formula</label>
        <el-select :value="oneRepMaxId" v-on:input="set1RepMax">
          <el-option v-for="max in oneRepMaxOptions" :key="max.id" :value="max.id" :label="max.name" />
        </el-select>
        <transition name="fade"><span v-if="oneRepMaxSaved" class="saved-notifier"> <i class="el-icon-circle-check"></i> Saved</span></transition>
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
import {all} from "../../application/models/OneRepMax";
import mutations from "../../vuex/mutations";
import {mapState, mapGetters} from "vuex";

export default {
  data() {
    return {
      oneRepMaxOptions: all,
      oneRepMaxSaved: false
    }
  },
  computed: {
    ...mapGetters([
      "oneRepMax"
    ]),
    ...mapState({
      oneRepMaxId: state => state.settings.oneRepMaxId
    })
  },
  watch: {
    oneRepMaxId() {
      this.oneRepMaxSaved = true;
      setTimeout(() => this.oneRepMaxSaved = false, 2000);
    }
  },
  methods: {
    set1RepMax(oneRepMaxId) {
      this.$store.commit(mutations.SET_1_REP_MAX, {oneRepMaxId})
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
</style>

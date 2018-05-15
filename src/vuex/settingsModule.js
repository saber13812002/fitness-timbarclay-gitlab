import mutations from "./mutations";
import actions from "./actions";
import * as oneRepMax from "../application/models/OneRepMax";
import * as units from "../application/models/Units";
import {Set} from "../application/models/Set";

export default {
  state: {
    weightUnitId: units.kilograms.id,
    oneRepMaxId: oneRepMax.brzycki.id
  },
  mutations: {
    [mutations.SET_WEIGHT_UNIT](state, {weightUnitId}) {
      state.weightUnitId = weightUnitId;
    },

    [mutations.SET_1_REP_MAX](state, {oneRepMaxId}) {
      state.oneRepMaxId = oneRepMaxId
    }
  },
  getters: {
    /**
     * The selected weight unit
     * @param {{id: String, name: String, unit: String, calculate: () => (kgWeight: Number) => Number}} state 
     */
    weightUnit(state) {
      return units.getById(state.weightUnitId);
    },
    
    /**
     * 
     * @param {{id: String, name: String, formulaText: String, calculate: () => (set: Set) => Number}} state 
     */
    oneRepMax(state) {
      return oneRepMax.getById(state.oneRepMaxId);
    }
  }
}

export function settingsReducer(state) {
  return state;
}
import _find from "lodash/find";

export const brzycki = {
  id: "brzycki",
  name: "Brzycki (1993)",
  formulaText: "weight / (1.0278 - 0.0278 * reps)",
  calculate() {
    return set => set.resistance / (1.0278 - 0.0278 * set.reps);
  }
}

export const epley = {
  id: "epley",
  name: "Epley (1985)",
  formulaText: "weight * (1 + 0.0333 * reps)",
  calculate() {
    return set => set.resistance * (1 + 0.0333 * set.reps);
  }
}

export const landers = {
  id: "landers",
  name: "Landers (1985)",
  formulaText: "(100 * weight) / (101.3 - 2.67123 * reps)",
  calculate() {
    return set => (100 * set.resistance) / (101.3 - 2.67123 * set.reps);
  }
}

export const lombardi = {
  id: "lombardi",
  name: "Lombardi (1989)",
  formulaText: "weight * reps^0.1",
  calculate() {
    return set => set.resistance * Math.pow(set.reps, 0.1);
  }
}

export const mayhew = {
  id: "mayhew",
  name: "Mayhew et al. (1992)",
  formulaText: "(100 * weight) / (52.2 + (41.9 * e(-0.055 * reps)))",
  calculate() {
    return set => (100 * set.resistance) / (52.2 + (41.9 * Math.exp(-0.055 * set.reps)));
  }
}

export const oConnor = {
  id: "oConnor",
  name: "O'Connor et al. (1989)",
  formulaText: "weight * (1 + 0.025 * reps)",
  calculate() {
    return set => set.resistance * (1 + 0.025 * set.reps)
  }
}

export const wathan = {
  id: "wathan",
  name: "Wathan (1994)",
  formulaText: "(100 * weight) / (48.8 + (53.8 * e(-0.075 * reps)))",
  calculate() {
    return set => (100 * set.resistance) / (48.8 + (53.8 * Math.exp(-0.075 * set.reps)));
  }
}

export const baechle = {
  id: "baechle",
  name: "Baechle (2000)",
  formulaText: "weight * (1 + 0.033 * reps)",
  calculate() {
    return set => set.resistance * (1 + 0.033 * set.reps);
  }
}

export const all = [brzycki, epley, landers, lombardi, mayhew, oConnor, wathan, baechle];

export function getById(id) {
  return _find(all, a => a.id === id);
}
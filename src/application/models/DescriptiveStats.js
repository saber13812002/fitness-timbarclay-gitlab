export const total = {
  id: "total",
  name: "Total",
  calculate(numbers) {
    return numbers.reduce((acc, cur) => acc + cur);
  }
}

export const max = {
  id: "max",
  name: "Maximum",
  calculate(numbers) {
    return Math.max(numbers);
  }
}

export const mean = {
  id: "mean",
  name: "Mean",
  calculate(numbers) {
    return total.calculate(numbers) / numbers.length;
  }
}
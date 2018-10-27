function formatCurrency(value) {
  if (!value) {
    return "R$ 0,00"
  }
  let [real, decimal] = (value / 100).toFixed(2).split(".")
  real = "R$ " + real.split(/(?=(?:...)*$)/).join(".")
  return `${real},${decimal}`
}

export { formatCurrency }

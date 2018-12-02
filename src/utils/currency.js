import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"
import grey from "@material-ui/core/colors/grey"

function formatCurrency(value) {
  if (!value) {
    return "R$ 0,00"
  }
  let [real, decimal] = (value / 100).toFixed(2).split(".")
  real = "R$ " + real.split(/(?=(?:...)*$)/).join(".")
  return `${real},${decimal}`
}

function currencyColor(value) {
  return value < 0 ? red["500"] : value > 0 ? green["500"] : grey["500"]
}

export { formatCurrency, currencyColor }

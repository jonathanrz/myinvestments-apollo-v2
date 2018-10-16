import { groupBy } from "lodash/fp"

export function groupByData(data, key) {
  if (!data.investments) {
    return {}
  }
  return groupBy(
    key,
    data.investments.map(investment => ({
      [key]: investment[key],
      value: investment.lastIncome ? investment.lastIncome.value : 0
    }))
  )
}

export function formatForTable(data, key) {
  const formatted = Object.keys(data).map((key, index) => ({
    label: key,
    value: data[key].reduce((acc, current) => acc + current.value, 0)
  }))
  const totalValue = formatted.reduce((acc, current) => acc + current.value, 0)
  return formatted.map(type => ({
    ...type,
    percent: `${((type.value / totalValue) * 100).toFixed(2)}%`
  }))
}

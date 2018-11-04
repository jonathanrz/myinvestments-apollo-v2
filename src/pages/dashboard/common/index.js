import { groupBy, sortBy } from "lodash/fp"
import { t } from "i18next"

export function groupByData(data, key) {
  if (!data.activeInvestments) {
    return {}
  }
  return groupBy(
    key,
    data.activeInvestments.map(investment => ({
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
  return [
    ...sortBy(
      o => o.label.toLowerCase(),
      formatted.map(type => ({
        ...type,
        percent: `${((type.value / totalValue) * 100).toFixed(2)}%`
      }))
    ),
    { label: t("common.total"), value: totalValue, percent: "100%" }
  ]
}

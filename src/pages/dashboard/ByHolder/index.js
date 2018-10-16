import React from "react"
import { t } from "i18next"
import { groupBy } from "lodash/fp"
import { withStyles } from "@material-ui/core/styles"
import Query from "app/common/Query"
import query from "./query"
import Table from "../common/Table"

function groupByData(data) {
  if (!data.investments) {
    return {}
  }
  return groupBy(
    "holder",
    data.investments.map(investment => ({
      holder: investment.holder,
      value: investment.lastIncome ? investment.lastIncome.value : 0
    }))
  )
}

function formatForTable(data) {
  const formatted = Object.keys(data).map((holder, index) => ({
    label: holder,
    value: data[holder].reduce((acc, current) => acc + current.value, 0)
  }))
  const totalValue = formatted.reduce((acc, current) => acc + current.value, 0)
  return formatted.map(type => ({
    ...type,
    percent: `${((type.value / totalValue) * 100).toFixed(2)}%`
  }))
}

function ByHolder({ classes }) {
  return (
    <Query query={query}>
      {({ data }) => {
        const formattedData = formatForTable(groupByData(data))
        return (
          <Table
            columns={[
              { header: t("dashboard.holder"), key: "label" },
              { header: t("dashboard.value"), key: "value", numeric: true },
              { header: t("dashboard.percent"), key: "percent", numeric: true }
            ]}
            content={formattedData}
          />
        )
      }}
    </Query>
  )
}

export default ByHolder

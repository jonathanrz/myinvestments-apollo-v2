import React from "react"
import { t } from "i18next"
import { flatten, sortBy, groupBy, get } from "lodash/fp"
import Query from "app/common/Query"
import { formatDate } from "app/utils/date"
import Table from "./Table"
import query from "./query"

function formatMonth(date) {
  return formatDate(date, t("common.monthFormat"))
}

function mapIncomes(data) {
  if (!data || !data.investments) {
    return []
  }

  const incomes = sortBy(
    "date",
    flatten(
      data.investments.map(investment =>
        investment.incomes.map(income => ({ ...income, investment }))
      )
    )
  )

  return groupBy(income => formatMonth(income.date), incomes)
}

function DashboardMonth() {
  return (
    <Query query={query}>
      {({ data }) => {
        if (!data || !data.investments) {
          return null
        }
        const { investments } = data
        const incomes = mapIncomes(data)

        return (
          <Table
            columns={[
              { header: t("dashboard.month.investment"), key: "investment" },
              ...Object.keys(incomes).map(key => ({
                header: key,
                key,
                numeric: true,
                currency: true
              }))
            ]}
            content={sortBy(
              i => i.investment.toLowerCase(),
              investments.map(investment => {
                const result = { investment: investment.name }
                Object.keys(incomes).map(key => {
                  result[key] =
                    get(
                      "value",
                      incomes[key].find(
                        income => income.investment.uuid === investment.uuid
                      )
                    ) || 0
                })
                return result
              })
            )}
          />
        )
      }}
    </Query>
  )
}

export default DashboardMonth

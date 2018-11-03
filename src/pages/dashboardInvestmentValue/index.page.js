import React from "react"
import { t } from "i18next"
import { flatten, sortBy, orderBy, groupBy } from "lodash/fp"
import Query from "app/common/Query"
import Filter from "app/common/ListFilter"
import { formatDate } from "app/utils/date"
import Table from "./Table"
import query from "./query"

const filters = [
  { key: "type", name: t("investments.listPage.filters.type") },
  { key: "holder", name: t("investments.listPage.filters.holder") },
  {
    key: "objective",
    name: t("investments.listPage.filters.objective")
  }
]

function formatMonth(date) {
  return formatDate(date, t("common.monthFormat"))
}

function mapIncomes(investments) {
  const incomes = orderBy(
    "date",
    "desc",
    flatten(
      investments.map(investment =>
        investment.incomes.map(income => ({ ...income, investment }))
      )
    )
  )

  return groupBy(income => formatMonth(income.date), incomes)
}

function renderTable(investments) {
  const incomes = mapIncomes(investments)

  const total = { investment: t("common.total") }
  Object.keys(incomes).map(key => {
    total[key] = incomes[key].reduce(
      (acc, i) => ({
        value: acc.value + i.value,
        diff: acc.diff + i.bought - i.sold
      }),
      { value: 0, diff: 0 }
    )
  })

  return (
    <Table
      columns={[
        {
          header: t("dashboard.month.investment"),
          key: "investment"
        },
        ...Object.keys(incomes).map(key => ({
          header: key,
          key,
          numeric: true,
          currency: true,
          colored: true
        }))
      ]}
      content={[
        ...sortBy(
          i => i.investment.toLowerCase(),
          investments.map(investment => {
            const result = { investment: investment.name }
            Object.keys(incomes).map(key => {
              const income = incomes[key].find(
                income => income.investment.uuid === investment.uuid
              ) || { value: 0, bought: 0, sold: 0 }
              result[key] = {
                value: income.value,
                diff: income.bought - income.sold
              }
            })
            return result
          })
        ),
        total
      ]}
    />
  )
}

function DashboardMonth() {
  return (
    <Query query={query}>
      {({ data }) => {
        if (!data || !data.investments) {
          return null
        }

        return (
          <Filter filters={filters} result={data.investments}>
            {filteredResult => renderTable(filteredResult)}
          </Filter>
        )
      }}
    </Query>
  )
}

export default DashboardMonth

import React from "react"
import { t } from "i18next"
import { sortBy } from "lodash/fp"
import Query from "app/common/Query"
import Filter from "app/common/ListFilter"
import Table from "./Table"
import query from "./query"

const columns = [
  {
    header: t("dashboard.month.investment"),
    key: "name"
  },
  {
    header: t("dashboard.soldInvestments.totalBought"),
    key: "totalBought",
    numeric: true,
    currency: true
  },
  {
    header: t("dashboard.soldInvestments.totalYield"),
    key: "totalYield",
    numeric: true,
    currency: true
  },
  {
    header: t("dashboard.soldInvestments.totalReceived"),
    key: "totalReceived",
    numeric: true,
    currency: true
  },
  {
    header: t("dashboard.soldInvestments.totalMonth"),
    key: "totalMonth",
    numeric: true
  },
  {
    header: t("dashboard.soldInvestments.perc"),
    key: "perc",
    numeric: true
  },
  {
    header: t("dashboard.soldInvestments.monthPerc"),
    key: "monthPerc",
    numeric: true
  }
]

const filters = [
  { key: "type", name: t("investments.listPage.filters.type") },
  { key: "holder", name: t("investments.listPage.filters.holder") },
  {
    key: "objective",
    name: t("investments.listPage.filters.objective")
  }
]

function renderTable(investments) {
  const content = [
    ...sortBy(
      i => i.name.toLowerCase(),
      investments.map(investment => {
        const perc = investment.totalYield / investment.totalBought
        return {
          ...investment,
          perc: `${(perc * 100).toFixed(2)}%`,
          monthPerc: `${((perc / investment.totalMonth) * 100).toFixed(2)}%`
        }
      })
    )
  ]
  return (
    <Table
      columns={columns}
      content={[
        ...content,
        {
          name: t("common.total"),
          totalBought: content.reduce((acc, data) => acc + data.totalBought, 0),
          totalYield: content.reduce((acc, data) => acc + data.totalYield, 0),
          totalReceived: content.reduce(
            (acc, data) => acc + data.totalReceived,
            0
          )
        }
      ]}
    />
  )
}

function DashboardSoldInvestments() {
  return (
    <Query query={query}>
      {({ data }) => {
        if (!data || !data.activeInvestments) {
          return null
        }

        return (
          <Filter filters={filters} result={data.activeInvestments}>
            {filteredResult => renderTable(filteredResult)}
          </Filter>
        )
      }}
    </Query>
  )
}

export default DashboardSoldInvestments

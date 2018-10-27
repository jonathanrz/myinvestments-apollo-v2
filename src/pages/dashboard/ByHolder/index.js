import React from "react"
import { t } from "i18next"
import Query from "app/common/Query"
import query from "./query"
import { groupByData, formatForTable } from "../common"
import Table from "../common/Table"
import PieChart from "../common/PieChart"

function ByHolder({ classes }) {
  return (
    <Query query={query}>
      {({ data }) => {
        const formattedData = formatForTable(
          groupByData(data, "holder"),
          "holder"
        )
        return (
          <div style={{ display: "flex" }}>
            <Table
              columns={[
                { header: t("dashboard.holder"), key: "label" },
                {
                  header: t("dashboard.value"),
                  key: "value",
                  numeric: true,
                  currency: true
                },
                {
                  header: t("dashboard.percent"),
                  key: "percent",
                  numeric: true
                }
              ]}
              content={formattedData}
            />
            <PieChart
              data={formattedData.filter(data => data.value > 1).map(data => ({
                x: data.label,
                y: data.value
              }))}
            />
          </div>
        )
      }}
    </Query>
  )
}

export default ByHolder

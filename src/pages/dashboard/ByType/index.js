import React from "react"
import { t } from "i18next"
import Query from "app/common/Query"
import query from "./query"
import { groupByData, formatForTable } from "../common"
import Table from "../common/Table"
import PieChart from "../common/PieChart"

function ByType() {
  return (
    <Query query={query}>
      {({ data }) => {
        const formattedData = formatForTable(groupByData(data, "type"), "type")
        return (
          <div style={{ display: "flex", flexGrow: 1 }}>
            <Table
              columns={[
                { header: t("dashboard.type"), key: "label" },
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
              data={formattedData
                .filter(
                  data => data.value > 1 && data.label !== t("common.total")
                )
                .map(data => ({
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

export default ByType

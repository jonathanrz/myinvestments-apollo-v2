import React from "react"
import { t } from "i18next"
import Query from "app/common/Query"
import query from "./query"
import { groupByData, formatForTable } from "../common"
import Table from "../common/Table"

function ByHolder({ classes }) {
  return (
    <Query query={query}>
      {({ data }) => {
        const formattedData = formatForTable(
          groupByData(data, "holder"),
          "holder"
        )
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

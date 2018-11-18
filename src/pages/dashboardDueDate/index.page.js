import React from "react"
import { t } from "i18next"
import Query from "app/common/Query"
import query from "./query"
import Table from "./Table"

function DueDate() {
  return (
    <Query query={query}>
      {({ data }) => {
        const formattedData = data.activeInvestments
          ? data.activeInvestments
              .filter(i => i.dueDate)
              .sort((a, b) => a.dueDate - b.dueDate)
          : []
        return (
          <div style={{ display: "flex" }}>
            <Table
              columns={[
                { header: t("dashboard.name"), key: "name" },
                { header: t("dashboard.type"), key: "type" },
                { header: t("dashboard.holder"), key: "holder" },
                { header: t("dashboard.dueDate"), key: "dueDate", date: true },
                {
                  header: t("dashboard.value"),
                  key: "lastIncome.value",
                  numeric: true,
                  currency: true
                }
              ]}
              content={formattedData}
            />
          </div>
        )
      }}
    </Query>
  )
}

export default DueDate

import { t } from "i18next"
import React, { Fragment } from "react"
import Card from "app/common/InvestmentCard"
import PageHeader from "app/common/PageHeader"
import RemoteTable from "app/common/RemoteTable"
import query from "./query"

function ListPage() {
  return (
    <Fragment>
      <PageHeader title={t("investments.soldPage.title")} />
      <RemoteTable
        query={query}
        listCard={Card}
        filters={[
          { key: "type", name: t("investments.listPage.filters.type") },
          { key: "holder", name: t("investments.listPage.filters.holder") },
          {
            key: "objective",
            name: t("investments.listPage.filters.objective")
          }
        ]}
        buildUpdateHref={node => `/investments/${node.uuid}/update`}
      />
    </Fragment>
  )
}

export default ListPage

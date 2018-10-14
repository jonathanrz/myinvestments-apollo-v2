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
        buildUpdateHref={node => `/investments/${node.uuid}/update`}
      />
    </Fragment>
  )
}

export default ListPage

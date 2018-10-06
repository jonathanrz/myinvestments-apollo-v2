import React, { Fragment } from "react"
import { t } from "i18next"
import { get } from "lodash/fp"
import Query from "app/common/Query"
import PageHeader from "app/common/PageHeader"
import query from "./query"
import Card from "./Card"

function InvestmentsOfMonth() {
  return (
    <Query query={query}>
      {({ data }) => {
        return (
          <Fragment>
            <PageHeader title={t("investments.ofMonth.title")} />
            {(get("investmentsOfMonth", data) || []).map(
              (investment, index) => (
                <Card key={index} investment={investment} />
              )
            )}
          </Fragment>
        )
      }}
    </Query>
  )
}

export default InvestmentsOfMonth

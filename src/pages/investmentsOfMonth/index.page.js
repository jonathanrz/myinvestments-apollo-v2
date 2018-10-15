import React, { Fragment } from "react"
import { t } from "i18next"
import { get } from "lodash/fp"
import Query from "app/common/Query"
import PageHeader from "app/common/PageHeader"
import Filter from "app/common/ListFilter"
import query from "./query"
import Card from "./Card"

function InvestmentsOfMonth() {
  return (
    <Query query={query}>
      {({ data }) => {
        return (
          <Fragment>
            <PageHeader title={t("investments.ofMonth.title")} />
            <Filter
              filters={[
                { key: "type", name: t("investments.listPage.filters.type") },
                {
                  key: "holder",
                  name: t("investments.listPage.filters.holder")
                }
              ]}
              result={get("investmentsOfMonth", data) || []}
            >
              {filteredResult =>
                filteredResult.map((investment, index) => (
                  <Card key={index} investment={investment} />
                ))
              }
            </Filter>
          </Fragment>
        )
      }}
    </Query>
  )
}

export default InvestmentsOfMonth

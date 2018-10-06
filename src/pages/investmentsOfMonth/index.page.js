import React, { Fragment } from "react"
import { get } from "lodash/fp"
import Query from "app/common/Query"
import query from "./query"
import Card from "./Card"

function InvestmentsOfMonth() {
  return (
    <Query query={query}>
      {({ data }) => {
        return (
          <Fragment>
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

import React from "react"
import { orderBy } from "lodash/fp"
import Query from "app/common/query"

import query from "./query"
import Body from "./Body"

function Investment({ match }) {
  return (
    <Query
      query={query}
      variables={{ uuid: match.params.uuid }}
      fetchPolicy="network-only"
    >
      {({ loading, error, data }) => {
        if (loading) {
          return null
        }
        if (error) {
          throw Error(error)
        }
        return (
          <Body
            investment={data.investment}
            incomes={orderBy(["date"], ["desc"], data.investment.incomes)}
          />
        )
      }}
    </Query>
  )
}

export default Investment

import React, { Fragment } from "react"
import Query from "app/common/Query"
import { getQueryKey } from "app/utils/graphql"

function RemoteTable({
  query,
  variables,
  queryProps,
  columns,
  cellStyle,
  buildUpdateHref,
  listCard: ListCard
}) {
  const queryKey = getQueryKey(query)

  return (
    <Query
      data-test="query"
      query={query}
      variables={variables}
      {...queryProps}
    >
      {({ data }) => {
        const result = data && data[queryKey]

        if (!result) {
          return null
        }

        return (
          <Fragment>
            {result.map((result, index) => (
              <ListCard
                key={index}
                result={result}
                updateHref={buildUpdateHref(result)}
              />
            ))}
          </Fragment>
        )
      }}
    </Query>
  )
}

export default RemoteTable

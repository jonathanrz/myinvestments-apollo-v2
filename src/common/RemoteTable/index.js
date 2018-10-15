import React from "react"
import Query from "app/common/Query"
import { getQueryKey } from "app/utils/graphql"
import Filter from "app/common/ListFilter"

function RemoteTable({
  query,
  variables,
  queryProps,
  filters,
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
          <Filter filters={filters || []} result={result}>
            {filteredResult =>
              filteredResult.map((result, index) => (
                <ListCard
                  key={index}
                  result={result}
                  updateHref={buildUpdateHref(result)}
                />
              ))
            }
          </Filter>
        )
      }}
    </Query>
  )
}

export default RemoteTable

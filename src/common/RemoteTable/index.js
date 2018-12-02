import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Query from "app/common/Query"
import { getQueryKey } from "app/utils/graphql"
import Filter from "app/common/ListFilter"

const styles = {
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
}

function RemoteTable({
  classes,
  query,
  variables,
  queryProps,
  filters,
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
            {filteredResult => (
              <div className={classes.list}>
                {filteredResult.map((result, index) => (
                  <ListCard
                    key={index}
                    result={result}
                    updateHref={buildUpdateHref(result)}
                  />
                ))}
              </div>
            )}
          </Filter>
        )
      }}
    </Query>
  )
}

export default withStyles(styles)(RemoteTable)

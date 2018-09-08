import React from "react"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import Query from "app/common/Query"
import { getQueryKey } from "app/utils/graphql"
import TableHead from "./TableHead"
import TableBody from "./TableBody"

function RemoteTable({ query, variables, queryProps, columns, cellStyle }) {
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
          <Paper>
            <Table>
              <TableHead data-test="table-head" columns={columns} />
              <TableBody
                data-test="table-body"
                edges={result}
                columns={columns}
                cellStyle={cellStyle}
              />
            </Table>
          </Paper>
        )
      }}
    </Query>
  )
}

export default RemoteTable

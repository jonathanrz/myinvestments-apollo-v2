import React, { Component } from "react"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import Query from "app/common/Query"
import { getQueryKey } from "app/utils/graphql"
import TableHead from "./TableHead"
import TableBody from "./TableBody"
import TableFooter from "./TableFooter"

class RemoteTable extends Component {
  state = {
    page: 0,
    pageSize: 10
  }

  onChangePage = (event, page) => {
    this.setState({ page })
  }

  onChangeRowsPerPage = event => {
    this.setState({ pageSize: event.target.value })
  }

  render() {
    const { query, variables, queryProps, columns, cellStyle } = this.props
    const { page, pageSize } = this.state
    const queryKey = getQueryKey(query)

    return (
      <Query
        data-test="query"
        query={query}
        variables={{ page: page + 1, pageSize, ...variables }}
        {...queryProps}
      >
        {({ data }) => {
          const result = data && data[queryKey]

          if (!result) {
            return null
          }

          const { totalCount, edges } = data[queryKey]

          return (
            <Paper>
              <Table>
                <TableHead data-test="table-head" columns={columns} />
                <TableBody
                  data-test="table-body"
                  edges={edges}
                  columns={columns}
                  cellStyle={cellStyle}
                />
                <TableFooter
                  data-test="table-footer"
                  page={page}
                  pageSize={pageSize}
                  totalCount={totalCount}
                  onChangePage={this.onChangePage}
                  onChangeRowsPerPage={this.onChangeRowsPerPage}
                />
              </Table>
            </Paper>
          )
        }}
      </Query>
    )
  }
}

export default RemoteTable

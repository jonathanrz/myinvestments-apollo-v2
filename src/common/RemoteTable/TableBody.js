import { get } from "lodash/fp"
import React from "react"
import MUITableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"

function TableBody({ edges, columns, cellStyle }) {
  return (
    <MUITableBody>
      {edges.map(({ node }) => (
        <TableRow key={node.id} data-test="row">
          {columns.map(({ path, columnProps, component: Component }, index) => {
            const value = path ? get(path, node) : node
            return (
              <TableCell style={cellStyle} {...columnProps} data-test="cell" key={index}>
                {Component ? <Component value={value} /> : value}
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </MUITableBody>
  )
}

export default TableBody

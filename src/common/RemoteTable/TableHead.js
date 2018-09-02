import React from "react"
import TableCell from "@material-ui/core/TableCell"
import MUITableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

function TableHead({ columns }) {
  return (
    <MUITableHead>
      <TableRow>
        {columns.map(({ header, headerComponent: Component = ({header}) => header, columnProps }, index) => (
          <TableCell {...columnProps} key={index} data-test="cell">
            <Component header={header}/>
          </TableCell>
        ))}
      </TableRow>
    </MUITableHead>
  )
}

export default TableHead

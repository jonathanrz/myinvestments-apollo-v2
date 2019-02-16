import React from "react"
import { withStyles } from "@material-ui/core/styles"
import MUITable from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { formatCurrency } from "app/utils/currency"

const CustomTableCell = withStyles(theme => ({
  root: {
    padding: 0
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    minWidth: 80,
    padding: 5
  },
  body: {
    fontSize: 14,
    padding: 5,
    whiteSpace: "nowrap"
  }
}))(TableCell)

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: "scroll"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
})

function Table({ classes, columns, content }) {
  return (
    <Paper className={classes.root}>
      <MUITable className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <CustomTableCell key={index} numeric={column.numeric}>
                {column.header}
              </CustomTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((line, index) => (
            <TableRow key={index} className={classes.row} hover>
              {columns.map((column, index) => (
                <CustomTableCell
                  key={index}
                  component="th"
                  scope="row"
                  numeric={column.numeric}
                >
                  {column.currency
                    ? formatCurrency(line[column.key])
                    : line[column.key]}
                </CustomTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </Paper>
  )
}

export default withStyles(styles)(Table)

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
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 500,
    marginTop: theme.spacing.unit * 3
  },
  table: {
    width: "100%"
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
            <TableRow key={index} className={classes.row}>
              {columns.map(
                (column, index) =>
                  index === 0 ? (
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
                  ) : (
                    <CustomTableCell key={index} numeric={column.numeric}>
                      {column.currency
                        ? formatCurrency(line[column.key])
                        : line[column.key]}
                    </CustomTableCell>
                  )
              )}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </Paper>
  )
}

export default withStyles(styles)(Table)

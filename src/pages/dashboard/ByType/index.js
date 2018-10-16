import React from "react"
import { t } from "i18next"
import { groupBy } from "lodash/fp"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Query from "app/common/Query"
import query from "./query"

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
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
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

function groupByData(data) {
  if (!data.investments) {
    return {}
  }
  return groupBy(
    "type",
    data.investments.map(investment => ({
      type: investment.type,
      value: investment.lastIncome ? investment.lastIncome.value : 0
    }))
  )
}

function formatForTable(data) {
  const formatted = Object.keys(data).map((type, index) => ({
    label: type,
    value: data[type].reduce((acc, current) => acc + current.value, 0)
  }))
  const totalValue = formatted.reduce((acc, current) => acc + current.value, 0)
  return formatted.map(type => ({ ...type, percent: type.value / totalValue }))
}

function ByType({ classes }) {
  return (
    <Query query={query}>
      {({ data }) => {
        const formattedData = formatForTable(groupByData(data))
        return (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>{t("dashboard.type")}</CustomTableCell>
                  <CustomTableCell numeric>
                    {t("dashboard.value")}
                  </CustomTableCell>
                  <CustomTableCell numeric>
                    {t("dashboard.percent")}
                  </CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formattedData.map((type, index) => (
                  <TableRow key={index} className={classes.row}>
                    <CustomTableCell component="th" scope="row">
                      {type.label}
                    </CustomTableCell>
                    <CustomTableCell numeric>{type.value}</CustomTableCell>
                    <CustomTableCell numeric>
                      {(type.percent * 100).toFixed(2)}%
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )
      }}
    </Query>
  )
}

export default withStyles(styles)(ByType)

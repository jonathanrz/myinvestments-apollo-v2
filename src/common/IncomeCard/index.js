import React from "react"
import { t } from "i18next"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import DatePrinter from "app/common/DatePrinter"
import TextField from "app/common/TextField"
import { formatCurrency, currencyColor } from "app/utils/currency"

const styles = {
  actions: {
    flexDirection: "row-reverse"
  },
  card: {
    minWidth: 275,
    width: "31.5%",
    margin: 10
  },
  fields: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  field: {
    width: "16.5%"
  },
  header: {
    marginBottom: 16,
    fontSize: 14,
    display: "flex",
    justifyContent: "space-between"
  }
}

function IncomeCard({ classes, income }) {
  return (
    <Card className={classes.card} key={income.uuid}>
      <CardContent>
        <Typography className={classes.header} color="textSecondary">
          <span>{income.quantity}</span>
          <Typography color="secondary">
            <DatePrinter value={income.date} />
          </Typography>
          <Typography color="primary">
            {formatCurrency(income.value)}
          </Typography>
          <Typography
            color="primary"
            style={{ color: currencyColor(income.yield) }}
          >
            {formatCurrency(income.yield)}
          </Typography>
        </Typography>
        <div className={classes.fields}>
          {[
            { label: t("investment.labels.bought"), value: income.bought },
            { label: t("investment.labels.sold"), value: income.sold },
            { label: t("investment.labels.gross"), value: income.gross },
            { label: t("investment.labels.ir"), value: income.ir },
            { label: t("investment.labels.fee"), value: income.fee }
          ].map((field, index) =>
            field.value ? (
              <TextField
                key={index}
                className={classes.field}
                label={field.label}
                value={formatCurrency(field.value)}
                disabled
              />
            ) : null
          )}
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          component={Link}
          to={`/incomes/${income.uuid}/update`}
          size="small"
          color="primary"
        >
          {t("incomes.actions.update")}
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(IncomeCard)

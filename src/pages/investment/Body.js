import React, { Fragment } from "react"
import { t } from "i18next"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import DateField from "app/common/DateField"
import TextField from "app/common/TextField"

const styles = {
  card: {
    minWidth: 275,
    margin: 10
  },
  details: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
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
  },
  subtitle: {
    fontSize: "30px",
    fontWeigth: "bold",
    margin: "30px 0"
  }
}

function Body({ classes, investment, incomes }) {
  return (
    <Fragment>
      <div className={classes.details}>
        <TextField
          label={t("investment.labels.name")}
          value={investment.name}
        />
        <TextField
          label={t("investment.labels.type")}
          value={investment.type}
        />
        <TextField
          label={t("investment.labels.holder")}
          value={investment.holder}
        />
        <TextField
          label={t("investment.labels.objective")}
          value={investment.objective}
        />
        <DateField
          label={t("investment.labels.dueDate")}
          value={investment.dueDate}
        />
      </div>
      <p className={classes.subtitle}>{t("investment.incomes")}</p>
      {incomes.map(income => (
        <Card className={classes.card} key={income.uuid}>
          <CardContent>
            <Typography className={classes.header} color="textSecondary">
              <TextField
                className={classes.field}
                label={t("investment.labels.quantity")}
                value={income.quantity}
                disabled
              />
            </Typography>
            <div className={classes.fields}>
              {[
                { label: t("investment.labels.value"), value: income.value },
                { label: t("investment.labels.bought"), value: income.bought },
                { label: t("investment.labels.sold"), value: income.sold },
                { label: t("investment.labels.gross"), value: income.gross },
                { label: t("investment.labels.ir"), value: income.ir },
                { label: t("investment.labels.fee"), value: income.fee }
              ].map((field, index) => (
                <TextField
                  key={index}
                  className={classes.field}
                  label={field.label}
                  value={field.value}
                  disabled
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </Fragment>
  )
}

export default withStyles(styles)(Body)

import React, { Fragment } from "react"
import { t } from "i18next"
import { withStyles } from "@material-ui/core/styles"
import DateField from "app/common/DateField"
import TextField from "app/common/TextField"
import IncomeCard from "./IncomeCard"

const styles = {
  details: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  subtitle: {
    fontSize: "30px",
    fontWeight: "bold",
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
        {investment.dueDate && (
          <DateField
            label={t("investment.labels.dueDate")}
            value={investment.dueDate}
          />
        )}
      </div>
      <p className={classes.subtitle}>{t("investment.incomes")}</p>
      {incomes.map(income => (
        <IncomeCard key={income.uuid} income={income} />
      ))}
    </Fragment>
  )
}

export default withStyles(styles)(Body)

import React, { Fragment } from "react"
import { t } from "i18next"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"
import ButtonWithIcon from "app/common/ButtonWithIcon"
import DateField from "app/common/DateField"
import TextField from "app/common/TextField"
import IncomeCard from "app/common/IncomeCard"

const styles = {
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  details: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  incomesList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
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
          label={t("investment.labels.incomeType")}
          value={investment.incomeType}
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
      <div className={classes.header}>
        <span className={classes.subtitle}>{t("investment.incomes")}</span>
        <ButtonWithIcon
          component={Link}
          to={`/incomes/create?investment=${investment.uuid}`}
          icon={AddIcon}
          text={t("listPage.createButtonLabel")}
        />
      </div>
      <div className={classes.incomesList}>
        {incomes.map(income => (
          <IncomeCard key={income.uuid} income={income} />
        ))}
      </div>
    </Fragment>
  )
}

export default withStyles(styles)(Body)

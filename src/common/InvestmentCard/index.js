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

const styles = {
  actions: {
    flexDirection: "row-reverse"
  },
  card: {
    minWidth: 275,
    margin: 10
  },
  header: {
    marginBottom: 16,
    fontSize: 14,
    display: "flex",
    justifyContent: "space-between"
  }
}

function InvestmentCard({ classes, result: investment, updateHref }) {
  return (
    <Card className={classes.card} key={investment.uuid}>
      <CardContent>
        <div className={classes.header}>
          <Typography color="textSecondary">{investment.type}</Typography>
          <Typography color="textSecondary">{investment.holder}</Typography>
          <Typography color="textSecondary">{investment.objective}</Typography>
          {investment.dueDate && (
            <Typography color="secondary">
              <DatePrinter value={investment.dueDate} />
            </Typography>
          )}
        </div>
        <Typography variant="headline" component="h2">
          {investment.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          component={Link}
          to={`/investment/${investment.uuid}`}
          size="small"
          color="primary"
        >
          {t("investments.actions.show")}
        </Button>
        <Button component={Link} to={updateHref} size="small" color="primary">
          {t("investments.actions.update")}
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(InvestmentCard)

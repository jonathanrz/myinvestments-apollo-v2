import React from "react"
import { t } from "i18next"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Form from "./Form"

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

function InvestmentCard({ classes, investment }) {
  return (
    <Card className={classes.card} key={investment.uuid}>
      <CardContent>
        <Typography className={classes.header} color="textSecondary">
          <span>{investment.type}</span>
          <span>{investment.holder}</span>
        </Typography>
        <Typography variant="headline" component="h2">
          {investment.name}
        </Typography>
        <Form investment={investment} />
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
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(InvestmentCard)

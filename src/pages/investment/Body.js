import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"

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
        <TextField label="Nome" value={investment.name} disabled />
        <TextField label="Tipo" value={investment.type} disabled />
        <TextField label="Detentor" value={investment.holder} disabled />
        <TextField label="Objetivo" value={investment.objective} disabled />
      </div>
      <p className={classes.subtitle}>Rendimentos</p>
      {incomes.map(income => (
        <Card className={classes.card} key={income.uuid}>
          <CardContent>
            <Typography className={classes.header} color="textSecondary">
              <TextField
                className={classes.field}
                label="Quantidade"
                value={income.quantity}
                disabled
              />
            </Typography>
            <div className={classes.fields}>
              {[
                { label: "Valor", value: income.value },
                { label: "Comprado", value: income.bought },
                { label: "Vendido", value: income.sold },
                { label: "Rendimento", value: income.gross },
                { label: "IR", value: income.ir },
                { label: "Taxa", value: income.fee }
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

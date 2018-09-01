import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 3
  },
  buttonWrapper: {
    marginLeft: "auto"
  }
})

function PageHeader({ classes, title, buttons }) {
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Typography variant="display2">{title}</Typography>
      {buttons && (
        <Grid item className={classes.buttonWrapper}>
          {buttons}
        </Grid>
      )}
    </Grid>
  )
}

export default withStyles(styles)(PageHeader)

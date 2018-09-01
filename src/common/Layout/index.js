import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh"
  }
})

function Layout({ classes, children }) {
  return (
    <Grid container className={classes.root} direction="column">
      {children}
    </Grid>
  )
}

export default withStyles(styles)(Layout)

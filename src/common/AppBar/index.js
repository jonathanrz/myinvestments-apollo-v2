import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import MUIAppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1
  },
  leftArea: {
    flex: 1,
    display: "flex",
    alignItems: "center"
  },
  toolbar: theme.mixins.toolbar
})

function AppBar({ classes, title, beforeTitle, afterTitle, rightArea }) {
  return (
    <Fragment>
      <MUIAppBar position="fixed" className={classes.root}>
        <Toolbar>
          <div className={classes.leftArea}>
            {beforeTitle}
            <Typography variant="title" color="inherit">
              {title}
            </Typography>
            {afterTitle}
          </div>
          {rightArea}
        </Toolbar>
      </MUIAppBar>
      <div className={classes.toolbar} />
    </Fragment>
  )
}

export default withStyles(styles)(AppBar)

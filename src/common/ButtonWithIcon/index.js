import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  }
})

function ButtonWithIcon({
  classes,
  icon: Icon,
  text,
  color = "primary",
  ...props
}) {
  return (
    <Button color={color} {...props}>
      <Icon className={classes.leftIcon} />
      {text}
    </Button>
  )
}

export default withStyles(styles)(ButtonWithIcon)

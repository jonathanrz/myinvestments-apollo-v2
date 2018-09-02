import React from "react"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { makeField } from "app/utils/forms"

const styles = {
  root: {
    display: "flex",
    marginBottom: 16
  }
}

function renderTextField({
  input,
  meta,
  classes,
  maxLength,
  inputProps,
  ...props
}) {
  const error = meta.touched && meta.error

  return (
    <TextField
      error={Boolean(error)}
      helperText={error}
      className={classes.root}
      inputProps={{
        maxLength,
        ...inputProps
      }}
      {...input}
      {...props}
    />
  )
}

export default withStyles(styles)(makeField(renderTextField, "TextField"))

import { t } from "i18next"
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { DateTimePicker } from "material-ui-pickers"
import { makeField } from "app/utils/forms"

const styles = {
  root: {
    display: "flex",
    marginBottom: 16
  }
}

function renderDateField({
  input: { value, ...input },
  meta,
  classes,
  ...props
}) {
  const error = meta.touched && meta.error
  return (
    <DateTimePicker
      error={Boolean(error)}
      helperText={error}
      className={classes.root}
      ampm={false}
      clearLabel={t("common.clearLabel")}
      clearable
      format={t("common.dateTimeFormat")}
      cancelLabel={t("common.cancel")}
      okLabel={t("common.ok")}
      value={value === "" ? null : value}
      {...input}
      {...props}
    />
  )
}

export default withStyles(styles)(makeField(renderDateField, "TextField"))

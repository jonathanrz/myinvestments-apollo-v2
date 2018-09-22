import { t } from "i18next"
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { DatePicker } from "material-ui-pickers"
import { makeField } from "app/utils/forms"
import { formatDate, parseDate } from "app/utils/date"

const styles = {
  root: {
    display: "flex",
    marginBottom: 16
  }
}

const DateFnsIsoDate = "t"

function renderDateField({
  input: { value, onChange, ...input },
  meta,
  classes,
  ...props
}) {
  const error = meta.touched && meta.error

  return (
    <DatePicker
      error={Boolean(error)}
      helperText={error}
      className={classes.root}
      format={t("common.dateFormat")}
      cancelLabel={t("common.cancel")}
      clearLabel={t("common.clearLabel")}
      clearable
      okLabel={t("common.ok")}
      value={value === "" ? null : parseDate(value, DateFnsIsoDate, new Date())}
      onChange={value => {
        onChange(formatDate(value, DateFnsIsoDate))
      }}
      {...input}
      {...props}
    />
  )
}

export default withStyles(styles)(makeField(renderDateField, "TextField"))

import React from "react"
import { t } from "i18next"
import { formatDate } from "app/utils/date"
import TextField from "app/common/TextField"

function DateField({ label, value, format = t("common.dateFormat") }) {
  const dateFormatted = value ? formatDate(value, format) : "-"

  return <TextField label={label} value={dateFormatted} />
}

export default DateField

import { t } from "i18next"
import React from "react"
import DatePrinter from "app/common/DatePrinter"

function DateTimePrinter({ value, format = t("common.dateTimeFormat") }) {
  return <DatePrinter value={value} format={format} />
}

export default DateTimePrinter

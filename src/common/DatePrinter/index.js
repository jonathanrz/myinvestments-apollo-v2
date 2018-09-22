import { t } from "i18next"
import { format as formatDate } from "date-fns"

function DatePrinter({ value, format = t("common.dateFormat") }) {
  if (!value) {
    return "-"
  }

  return formatDate(value, format)
}

export default DatePrinter

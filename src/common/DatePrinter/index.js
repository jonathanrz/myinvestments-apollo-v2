import { t } from "i18next"
import { formatDate } from "app/utils/date"

function DatePrinter({ value, format = t("common.dateFormat") }) {
  if (!value) {
    return "-"
  }

  return formatDate(value, format)
}

export default DatePrinter

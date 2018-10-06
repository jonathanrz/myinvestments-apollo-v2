import { t } from "i18next"
import { format as dateFnsFormat, parse } from "date-fns"

function formatDate(value, format = t("common.dateFormat")) {
  if (!value) {
    return null
  }

  if (typeof value === "number") {
    return dateFnsFormat(value * 1000, format)
  }
  return dateFnsFormat(value, format)
}

function formatDateForApi(value) {
  return formatDate(value, "t")
}

function parseDate(
  value,
  format = t("common.dateFormat"),
  defaultValue = new Date()
) {
  let formattedValue = value
  if (typeof value === "number") {
    formattedValue = formatDate(value, format)
  }
  return parse(formattedValue, format, defaultValue)
}

export { formatDate, formatDateForApi, parseDate }

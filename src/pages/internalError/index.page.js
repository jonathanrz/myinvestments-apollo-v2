import { t } from "i18next"
import React from "react"
import ErrorPage from "app/common/ErrorPage"

function InternalError() {
  return (
    <ErrorPage
      title={t("errorPage.internalError.title")}
      description={t("errorPage.internalError.description")}
    />
  )
}

export default InternalError

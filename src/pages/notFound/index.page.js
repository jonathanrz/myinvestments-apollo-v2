import { t } from "i18next"
import React from "react"
import ErrorPage from "app/common/ErrorPage"

function NotFound() {
  return (
    <ErrorPage
      title={t("errorPage.notFound.title")}
      description={t("errorPage.notFound.description")}
    />
  )
}

export default NotFound

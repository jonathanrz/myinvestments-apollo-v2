import { t } from "i18next"
import createCRUD from "app/utils/createCRUD"
import Form from "./Form"

const fields = ["name", "type", "holder", "objective"]

const { ListPage, CreatePage, UpdatePage } = createCRUD({
  entity: "Investment",
  pathPreffix: "investments",
  i18nKey: "investments",
  listColumns: fields.map(field => ({ header: t(`investments.fields.${field}`), path: field })),
  upsertForm: Form,
  upsert: {
    errorMessage: error =>
      error.message && error.message.includes("duplicate key")
        ? t("investments.upsertPages.duplicateInvestiment")
        : t("investments.upsertPages.genericErrorMessage")
  }
})

export { ListPage, CreatePage, UpdatePage }

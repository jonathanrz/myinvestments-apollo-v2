import { t } from "i18next"
import createCRUD from "app/utils/createCRUD"
import Form from "./Form"

const { ListPage, CreatePage, UpdatePage } = createCRUD({
  entity: "Investment",
  pathPreffix: "investments",
  i18nKey: "investments",
  listColumns: [{ header: t("investments.fields.name"), path: "name" }],
  upsertForm: Form,
  create: {
    initialValues: {
      admin: true
    }
  },
  upsert: {
    errorMessage: error =>
      error.message && error.message.includes("duplicate key")
        ? t("investments.upsertPages.duplicateInvestiment")
        : t("investments.upsertPages.genericErrorMessage")
  }
})

export { ListPage, CreatePage, UpdatePage }

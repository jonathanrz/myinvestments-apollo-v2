import { t } from "i18next"
import createCRUD from "app/utils/createCRUD"
import Form from "./Form"
import Card from "./Card"

const { ListPage, CreatePage, UpdatePage } = createCRUD({
  entity: "Investment",
  pathPrefix: "investments",
  i18nKey: "investments",
  listCard: Card,
  upsertForm: Form,
  upsert: {
    errorMessage: error =>
      error.message && error.message.includes("duplicate key")
        ? t("investments.upsertPages.duplicateInvestment")
        : t("investments.upsertPages.genericErrorMessage")
  }
})

export { ListPage, CreatePage, UpdatePage }

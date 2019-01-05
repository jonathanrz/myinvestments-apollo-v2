import { t } from "i18next"
import Card from "app/common/InvestmentCard"
import createCRUD from "app/utils/createCRUD"
import Form from "./Form"

const { ListPage, CreatePage, UpdatePage } = createCRUD({
  entity: "Investment",
  pathPrefix: "investments",
  i18nKey: "investments",
  listCard: Card,
  filters: [
    { key: "type", name: t("investments.listPage.filters.type") },
    { key: "incomeType", name: t("investments.listPage.filters.incomeType") },
    { key: "holder", name: t("investments.listPage.filters.holder") },
    { key: "objective", name: t("investments.listPage.filters.objective") }
  ],
  upsertForm: Form,
  upsert: {
    errorMessage: error =>
      error.message && error.message.includes("duplicate key")
        ? t("investments.upsertPages.duplicateInvestment")
        : t("investments.upsertPages.genericErrorMessage"),
    parseOutput: data => {
      if (data.dueDate) {
        return {
          ...data,
          dueDate: parseInt(data.dueDate)
        }
      }
      return data
    }
  }
})

export { ListPage, CreatePage, UpdatePage }

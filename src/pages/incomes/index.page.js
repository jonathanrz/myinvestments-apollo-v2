import { t } from "i18next"
import createCRUD from "app/utils/createCRUD"
import Form from "./Form"

const { ListPage, CreatePage, UpdatePage } = createCRUD({
  entity: "Income",
  pathPrefix: "incomes",
  i18nKey: "incomes",
  upsertForm: Form,
  upsert: {
    errorMessage: () => t("incomes.upsertPages.genericErrorMessage"),
    parseOutput: data => {
      if (data.date) {
        return {
          ...data,
          date: parseInt(data.date)
        }
      }
      return data
    }
  }
})

export { ListPage, CreatePage, UpdatePage }

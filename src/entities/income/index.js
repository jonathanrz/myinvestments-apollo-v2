import * as graphqlUtils from "app/utils/graphql"

export default {
  name: "Income",
  getQuery: graphqlUtils.getQuery("income", [
    "uuid",
    "date",
    "quantity",
    "value",
    "bought",
    "sold",
    "gross",
    "ir",
    "fee"
  ]),
  listQuery: require("./list").default,
  createMutation: graphqlUtils.createMutation("createIncome", "IncomeInput"),
  updateMutation: graphqlUtils.updateMutation("updateIncome", "IncomeInput")
}

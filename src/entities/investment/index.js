import * as graphqlUtils from "app/utils/graphql"

export default {
  name: "Investment",
  getQuery: graphqlUtils.getQuery("investment", [
    "uuid",
    "name",
    "type",
    "incomeType",
    "holder",
    "objective",
    "dueDate"
  ]),
  listQuery: require("./list").default,
  createMutation: graphqlUtils.createMutation(
    "createInvestment",
    "InvestmentInput"
  ),
  updateMutation: graphqlUtils.updateMutation(
    "updateInvestment",
    "InvestmentInput"
  )
}

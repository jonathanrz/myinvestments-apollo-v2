import * as graphqlUtils from "app/utils/graphql"

export default {
  name: "Investment",
  getQuery: graphqlUtils.getQuery("investments", ["uuid", "name"]),
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

import routeBuilder from "app/utils/routeBuilder"

routeBuilder
  .redirect("/", "/dashboard")
  .private("/dashboard", "dashboard")
  .private("/dashboardMonth", "dashboardMonth")
  .private("/dashboardInvestmentValue", "dashboardInvestmentValue")
  .private("/dashboardSoldInvestments", "dashboardSoldInvestments")
  .crud("/investments", "investments")
  .private("/investment/:uuid", "investment")
  .private("/investmentsSold", "investmentsSold")
  .private("/investmentsOfMonth", "investmentsOfMonth")
  .crud("/incomes", "incomes")
  .public("/login", "login")
  .public("/internalError", "internalError")
  /*
    * The NotFound page should always come last,
    * because react-router's Switch component
    * will render the first route that matches,
    * and the NotFound page does not have any
    * route set, so it will match any url
    */
  .public(null, "notFound")

export default routeBuilder.get()

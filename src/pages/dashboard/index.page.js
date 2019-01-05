import React from "react"
import ByType from "./ByType"
import ByIncomeType from "./ByIncomeType"
import ByObjective from "./ByObjective"
import ByHolder from "./ByHolder"

function Dashboard() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <ByType />
      <ByIncomeType />
      <ByObjective />
      <ByHolder />
    </div>
  )
}

export default Dashboard

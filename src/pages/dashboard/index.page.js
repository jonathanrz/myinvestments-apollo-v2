import React, { Fragment } from "react"
import ByType from "./ByType"
import ByObjective from "./ByObjective"
import ByHolder from "./ByHolder"

function Dashboard() {
  return (
    <Fragment>
      <ByType />
      <ByObjective />
      <ByHolder />
    </Fragment>
  )
}

export default Dashboard

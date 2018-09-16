import React from "react"

function Investment({ match }) {
  return <div>{match.params.uuid}</div>
}

export default Investment

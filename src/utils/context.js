import React from "react"

export function withConsumer(Consumer) {
  return Component => props => (
    <Consumer>{context => <Component {...props} context={context} />}</Consumer>
  )
}

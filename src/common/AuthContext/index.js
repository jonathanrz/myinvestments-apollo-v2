import React, { createContext } from "react"

const { Consumer, Provider } = createContext({})

/*
  * We need to wrap these in new components
  * to make sure that they will be
  * rerendered with the new reference on
  * hot module reloading
  */

export const AuthProvider = ({ children, loggedIn, setToken }) => (
  <Provider value={{ loggedIn, setToken }}>{children}</Provider>
)

export const AuthConsumer = ({ children }) => <Consumer>{children}</Consumer>

export function withAuthConsumer(Component) {
  return props => (
    <AuthConsumer>{value => <Component {...props} {...value} />}</AuthConsumer>
  )
}

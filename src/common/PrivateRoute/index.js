import React from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthConsumer } from "app/common/AuthContext"
import PrivateLayout from "app/common/PrivateLayout"

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <AuthConsumer>
          {({ loggedIn }) =>
            loggedIn ? (
              <PrivateLayout>
                <Component data-test="component" {...props} />
              </PrivateLayout>
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        </AuthConsumer>
      )}
    />
  )
}

export default PrivateRoute

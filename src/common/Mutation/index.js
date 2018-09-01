import React, { Fragment } from "react"
import { Redirect } from "react-router-dom"
import { Mutation as ApolloMutation } from "react-apollo"
import { ShowLoadingIndicator } from "app/common/LoadingIndicator"

function Mutation({ redirectOnError = true, children, ...props }) {
  return (
    <ApolloMutation {...props}>
      {(mutate, state) =>
        state.error &&
        redirectOnError &&
        process.env.NODE_ENV === "production" ? (
          <Redirect to="/internalError" />
        ) : (
          <Fragment>
            {state.loading && <ShowLoadingIndicator />}
            {children(mutate, state)}
          </Fragment>
        )
      }
    </ApolloMutation>
  )
}

export default Mutation

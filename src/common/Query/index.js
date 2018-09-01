import React, { Fragment } from "react"
import { Redirect } from "react-router-dom"
import { Query as ApolloQuery } from "react-apollo"
import { ShowLoadingIndicator } from "app/common/LoadingIndicator"
import { DEFAULT_FETCH_POLICY } from "app/utils/consts"

function Query({
  redirectOnError = true,
  children,
  fetchPolicy = DEFAULT_FETCH_POLICY,
  ...props
}) {
  return (
    <ApolloQuery
      {...props}
      fetchPolicy={fetchPolicy}
      notifyOnNetworkStatusChange
    >
      {state =>
        state.error &&
        redirectOnError &&
        process.env.NODE_ENV === "production" ? (
          <Redirect to="/internalError" />
        ) : (
          <Fragment>
            {(state.loading || state.networkStatus === 4) && (
              <ShowLoadingIndicator />
            )}
            {children(state)}
          </Fragment>
        )
      }
    </ApolloQuery>
  )
}

export default Query

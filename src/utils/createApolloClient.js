import { ApolloClient } from "apollo-client"
import { createUploadLink } from "apollo-upload-client"
import { ApolloLink, concat } from "apollo-link"
import { onError as createErrorAfterware } from "apollo-link-error"
import { InMemoryCache } from "apollo-cache-inmemory"

function checkUnauthorizedMessage(graphQLErrors) {
  return graphQLErrors.find(
    ({ message, path }) => message === "Unauthorized" && !path.includes("login")
  )
}

export default function createApolloClient({ getToken, onUnauthorized }) {
  const httpLink = createUploadLink({
    uri: process.env.GRAPHQL_API_URL,
    credentials: "same-origin"
  })

  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = getToken()
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }

    return forward(operation)
  })

  const errorAfterware = createErrorAfterware(
    ({ graphQLErrors, networkError }) => {
      let hasUnauthorizedMessage = false

      if (graphQLErrors) {
        if (checkUnauthorizedMessage(graphQLErrors)) {
          hasUnauthorizedMessage = true
        } else {
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        }
      }

      if (networkError) {
        console.error(`[Network error]: ${networkError}`)
      }

      if (hasUnauthorizedMessage) {
        onUnauthorized()
      }
    }
  )

  const client = new ApolloClient({
    link: errorAfterware.concat(concat(authMiddleware, httpLink)),
    cache: new InMemoryCache({
      dataIdFromObject: object => object.uuid || null
    })
    /*
     * It seems the we can't set the default
     * fetch policy here because this is broken
     * on the Apollo Client
     *
     * https://github.com/apollographql/apollo-client/issues/3256
     */
  })

  return client
}

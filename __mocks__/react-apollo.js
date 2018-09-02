export function ApolloProvider({ children }) {
  return children
}

export function graphql() {
  return f => f
}

export function withApollo(f) {
  return f
}

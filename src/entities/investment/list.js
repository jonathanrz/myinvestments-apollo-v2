import gql from "graphql-tag"

export default gql`
  query ListInvestments {
    investments {
      uuid
      name
    }
  }
`
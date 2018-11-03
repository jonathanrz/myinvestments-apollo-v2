import gql from "graphql-tag"

export default gql`
  query ListInvestments {
    soldInvestments {
      uuid
      name
      type
      holder
      objective
    }
  }
`

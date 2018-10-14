import gql from "graphql-tag"

export default gql`
  query ListInvestments {
    investments(sold: true) {
      uuid
      name
      type
      holder
      objective
      dueDate
    }
  }
`

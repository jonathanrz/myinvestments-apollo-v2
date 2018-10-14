import gql from "graphql-tag"

export default gql`
  query ListInvestments {
    investments(sold: false) {
      uuid
      name
      type
      holder
      objective
      dueDate
    }
  }
`

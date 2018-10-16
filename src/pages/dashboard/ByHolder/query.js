import gql from "graphql-tag"

export default gql`
  {
    investments(sold: false) {
      uuid
      holder
      lastIncome {
        value
      }
    }
  }
`

import gql from "graphql-tag"

export default gql`
  {
    activeInvestments {
      uuid
      type
      lastIncome {
        value
      }
    }
  }
`

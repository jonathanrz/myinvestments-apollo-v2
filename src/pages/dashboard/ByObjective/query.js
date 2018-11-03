import gql from "graphql-tag"

export default gql`
  {
    activeInvestments {
      uuid
      objective
      lastIncome {
        value
      }
    }
  }
`

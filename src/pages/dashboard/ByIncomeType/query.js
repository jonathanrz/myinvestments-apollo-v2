import gql from "graphql-tag"

export default gql`
  {
    activeInvestments {
      uuid
      incomeType
      lastIncome {
        value
      }
    }
  }
`

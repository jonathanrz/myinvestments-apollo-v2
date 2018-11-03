import gql from "graphql-tag"

export default gql`
  {
    activeInvestments {
      uuid
      holder
      lastIncome {
        value
      }
    }
  }
`

import gql from "graphql-tag"

export default gql`
  query ListInvestments {
    activeInvestments {
      uuid
      name
      type
      incomeType
      holder
      objective
      dueDate
      lastIncome {
        value
      }
    }
  }
`

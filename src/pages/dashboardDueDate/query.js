import gql from "graphql-tag"

export default gql`
  {
    activeInvestments {
      uuid
      name
      type
      holder
      dueDate
      lastIncome {
        value
      }
    }
  }
`

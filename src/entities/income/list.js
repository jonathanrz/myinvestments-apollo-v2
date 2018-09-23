import gql from "graphql-tag"

export default gql`
  query ListIncomes {
    incomes {
      uuid
      date
      quantity
      value
      bought
      sold
      gross
      ir
      fee
    }
  }
`

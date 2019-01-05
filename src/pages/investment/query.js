import gql from "graphql-tag"

export default gql`
  query Investment($uuid: String!) {
    investment(uuid: $uuid) {
      uuid
      name
      type
      incomeType
      holder
      objective
      dueDate
      incomes {
        uuid
        date
        quantity
        value
        yield
        bought
        sold
        gross
        ir
        fee
      }
    }
  }
`

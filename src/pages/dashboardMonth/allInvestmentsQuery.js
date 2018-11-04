import gql from "graphql-tag"

export default gql`
  {
    investments {
      uuid
      name
      type
      holder
      objective
      incomes {
        uuid
        date
        yield
        received
      }
    }
  }
`

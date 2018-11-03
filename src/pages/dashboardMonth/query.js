import gql from "graphql-tag"

export default gql`
  {
    investments(sold: false) {
      uuid
      name
      type
      holder
      objective
      incomes {
        uuid
        date
        yield
      }
    }
  }
`

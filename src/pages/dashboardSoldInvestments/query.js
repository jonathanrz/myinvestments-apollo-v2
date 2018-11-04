import gql from "graphql-tag"

export default gql`
  {
    soldInvestments {
      uuid
      name
      type
      holder
      objective
      totalBought
      totalYield
      totalReceived
      totalMonth
    }
  }
`

import gql from "graphql-tag"

export default gql`
  {
    activeInvestments {
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

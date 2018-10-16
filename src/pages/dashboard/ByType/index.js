import React from "react"
import { groupBy } from "lodash/fp"
import Query from "app/common/Query"
import query from "./query"

function groupByData(data) {
  if (!data.investments) {
    return {}
  }
  return groupBy(
    "type",
    data.investments.map(investment => ({
      type: investment.type,
      value: investment.lastIncome ? investment.lastIncome.value : 0
    }))
  )
}

function ByType() {
  return (
    <Query query={query}>
      {({ data }) => {
        const groupedData = groupByData(data)
        console.log({ groupedData })
        return (
          <table>
            <tr>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
            {Object.keys(groupedData).map((type, index) => (
              <tr key={index}>
                <td>{type}</td>
                <td>
                  {groupedData[type].reduce(
                    (acc, current) => acc + current.value,
                    0
                  )}
                </td>
              </tr>
            ))}
          </table>
        )
      }}
    </Query>
  )
}

export default ByType

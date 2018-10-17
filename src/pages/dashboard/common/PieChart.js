import React from "react"
import { VictoryPie, VictoryTheme, VictoryContainer } from "victory"

function PieChart(props) {
  return (
    <VictoryPie
      theme={VictoryTheme.material}
      containerComponent={<VictoryContainer responsive={false} />}
      height={300}
      width={400}
      innerRadius={50}
      radius={100}
      labelRadius={120}
      style={{
        labels: {
          fontSize: 12
        }
      }}
      {...props}
    />
  )
}

export default PieChart

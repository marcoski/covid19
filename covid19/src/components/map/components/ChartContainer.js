import React from 'react'
import DailyGrow from '../../charts/DailyGrow'

const ChartContainer = ({ data, aggregate, currentAggregate }) => {
  return (
    <div className="chart-container">
      <h3>Incrementi giornalieri</h3>
      <DailyGrow data={data} aggregate={aggregate} currentAggregate={currentAggregate} />
    </div>
  )
}

export default ChartContainer
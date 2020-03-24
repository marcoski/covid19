import React from 'react'

const CovidLegend = (aggregate) => ({ payload }) => {
  return (
    <ul className="charts-legend">
      {payload.map((entry, index) => (
        <li key={index} className="charts-legend-item">
          <span className="charts-legend-item-icon fas fa-circle" style={{ color: entry.color }}></span>
          <span className="charts-legend-item-text">{entry.value}</span>
        </li>
      ))}
    </ul>
  )
}

export default CovidLegend
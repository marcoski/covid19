import React from 'react'
import Select from 'react-select'
import { getYAxisDomain } from '../../utils/data'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { useGrowthRates } from './hooks/growthrates'
import CovidLegend from './CovidLegend'

const GrowthRates = ({ data, dates, active, aggregate }) => {
  const {
    log, selectOptions, onSetLog, selectValue, elements, graphData
  } = useGrowthRates(data, active, aggregate)
  const handleSetLog = ({ value }) => onSetLog(value)
  return (
    <div className="growth">
      <div className="charts-title">
        <h3>Tasso di crescita ({dates} giorni)</h3>
        <div className="selector">
          <span className="text">Scala</span>
          <Select
            className="select"
            options={selectOptions}
            onChange={handleSetLog}
            value={selectValue()}
          />
        </div>
      </div>
      {elements !== null &&
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            {(function () {
              if (log) return <YAxis scale="log" domain={['auto', 'auto']} />
              return <YAxis domain={getYAxisDomain(data, elements)} />
            }())}
            <Tooltip />
            <Legend verticalAlign="top" height={36} content={CovidLegend(aggregate)} />
            {elements.map(el => (
              <Line
                key={el.key}
                strokeWidth={2}
                name={el.label}
                type="monotone"
                dataKey={el.key}
                stroke={el.fill}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      }
    </div>
  )
}

export default GrowthRates
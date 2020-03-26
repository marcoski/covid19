import React from 'react'
import Select from 'react-select'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { useDailyGrow } from './hooks/dailygrow'
import CovidLegend from './CovidLegend'


const DailyGrow = ({ data, aggregate, currentAggregate }) => {
  const { log, graphData, elements, onSetLog, selectOptions, selectValue } = useDailyGrow(data, aggregate, currentAggregate)
  const handleSetLog = ({ value }) => onSetLog(value)
  console.log(elements)
  return (
    <div className="grow">
      <div className="charts-title">
        <h3>Incrementi giornalieri</h3>
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
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            {(function () {
              if (log) return <YAxis scale="log" domain={['auto', 'auto']} />
              return <YAxis />
            }())}
            <Tooltip />
            <Legend verticalAlign="top" height={36} content={CovidLegend()} />
            {elements.map(el => (<
              Line strokeWidth={2} key={el.key} name={el.label} type="monotone" dataKey={el.key} stroke={el.fill} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      }
    </div>
  )
}

export default DailyGrow
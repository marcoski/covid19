import React from 'react'
import { getLineChartKeysMap, getObjectData, getYAxisDomain } from '../../utils/data'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { intlSelector } from '../../utils/i18n'
import { useSelector } from 'react-redux'
import { useFilters } from '../../hooks/filters'

const GrowthRates = ({ data, dates, active }) => {
  const { filters } = useFilters(false)
  const dateFormat = useSelector(state => intlSelector(state, 'date_format'))
  const elements = getLineChartKeysMap(filters)
  const graphData = getObjectData(data, elements, dateFormat, active)
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={getYAxisDomain(data, elements)} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        {elements.map(el => (
          <Line key={el.key} strokeWidth={2} name={el.label} type="monotone" dataKey={el.key} stroke={el.fill} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default GrowthRates
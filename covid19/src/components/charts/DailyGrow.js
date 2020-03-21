import React from 'react'
import colors from '../../scss/_variables.scss'
import moment from 'moment'
import { getLineChartKeysMap, getObjectData } from '../../utils/data'
import { useSelector } from 'react-redux'
import { intlSelector } from '../../utils/i18n'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { useFilters } from '../../hooks/filters'

const getDataAggregateChartData = (data, aggregate, dateFormat, currentAggregate, filters) => data.map(el => {
  const { name, ...rest } = aggregate[moment(el.name, dateFormat).format('YYYY-MM-DD')]
  const elementsData = filters.map(filter => ({
    [`${filter.key}_${currentAggregate.toLowerCase()}`]: rest[filter.key]
  }))
  return elementsData.reduce((acc, cur) => ({ ...acc, ...el, ...cur }), {})
})

const getDataAggregateKeysMap = (elements, currentAggregate) => {
  const aggregateKeysMap = elements.map(el => ({
    key: `${el.key}_${currentAggregate.toLowerCase()}`,
    label: `${el.label} (${currentAggregate})`,
    fill: colors.red
  }))
  return [...elements, ...aggregateKeysMap]
}

const DailyGrow = ({ data, aggregate, currentAggregate }) => {
  const { filters } = useFilters(true)
  const dateFormat = useSelector(state => intlSelector(state, 'date_format'))
  let elements = getLineChartKeysMap(filters)
  let graphData = getObjectData(data, elements, dateFormat)
  if (currentAggregate && currentAggregate !== '') {
    const dataAggregate = {}
    for (const key of Object.keys(aggregate)) {
      /** SOLUZIONE QUICK AND DIRTY */
      if(aggregate[key][currentAggregate]) {
        dataAggregate[key] = aggregate[key][currentAggregate]
      }
    }
    /** SOLUZIONE QUICK AND DIRTY */
    if(Object.keys(dataAggregate).length > 0) {
      graphData = getDataAggregateChartData(graphData, dataAggregate, dateFormat, currentAggregate, elements)
      elements = getDataAggregateKeysMap(elements, currentAggregate)
    }
  }
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        {elements.map(el => (<
          Line strokeWidth={2} key={el.key} name={el.label} type="monotone" dataKey={el.key} stroke={el.fill} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default DailyGrow
import { useState, useCallback, useEffect } from "react"
import colors from '../../../scss/_variables.scss'
import moment from 'moment'
import { useFilters } from "../../../hooks/filters"
import { useSelector } from "react-redux"
import { intlSelector } from "../../../utils/i18n"
import { getLineChartKeysMap, getObjectData, getLogarithmicObjectData } from "../../../utils/data"
import { useLogarithmic } from "./logarighmic"

export const getDataAggregateChartData = (data, aggregate, dateFormat, currentAggregate, filters) => {
  return data.map(el => {
    const { name, ...rest } = aggregate[moment(el.name, dateFormat).format('YYYY-MM-DD')]
    const elementsData = filters.map(filter => ({
      [`${filter}_${currentAggregate.toLowerCase()}`]: rest[currentAggregate][filter]
    }))
    return elementsData.reduce((acc, cur) => ({ ...acc, ...el, ...cur }), {})
  })
}

export const getDataAggregateKeysMap = (filters, currentAggregate) => {
  const elements = getLineChartKeysMap(filters)
  if (!elements[0]) return []
  const aggregateKeysMap = {
    key: `${elements[0].key}_${currentAggregate.toLowerCase()}`,
    label: `${elements[0].label} (${currentAggregate})`,
    fill: colors.red
  }
  return [elements[0], aggregateKeysMap]
}

export const useDailyGrow = (data, aggregate, currentAggregate) => {
  const { log, selectOptions, onSetLog, selectValue } = useLogarithmic()
  const [graphData, setGraphData] = useState(null)
  const [elements, setElements] = useState(null)
  const { filters } = useFilters()
  const dateFormat = useSelector(state => intlSelector(state, 'date_format'))

  const handleSetLog = useCallback(log => {
    onSetLog(log)
    setGraphData(getLogarithmicObjectData(graphData))
  }, [graphData, log])

  useEffect(() => {
    if (currentAggregate === '') {
      setElements(getLineChartKeysMap(filters))
    }
  }, [data, filters, currentAggregate])

  useEffect(() => {
    if (elements !== null && currentAggregate === '') {
      setGraphData(getObjectData(data, filters, dateFormat))
    }
  }, [elements, currentAggregate])

  useEffect(() => {
    if (currentAggregate && currentAggregate !== '') {
      onSetLog(true)
      const gdata = getDataAggregateChartData(
        getObjectData(data, filters, dateFormat),
        aggregate,
        dateFormat,
        currentAggregate,
        filters
      )
      setGraphData(getLogarithmicObjectData(gdata))
      setElements(getDataAggregateKeysMap(filters, currentAggregate))
    }
  }, [currentAggregate, filters])

  return {
    log,
    selectOptions,
    graphData,
    elements,
    selectValue,
    onSetLog: handleSetLog
  }
}
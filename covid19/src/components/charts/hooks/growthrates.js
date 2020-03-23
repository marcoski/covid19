import { useLogarithmic } from "./logarighmic"
import { useCallback, useState, useEffect } from "react"
import { useFilters } from "../../../hooks/filters"
import { useSelector } from "react-redux"
import { getLogarithmicObjectData, getLineChartKeysMap, getObjectData } from "../../../utils/data"
import { intlSelector } from "../../../utils/i18n"
import moment from "moment"
import color from 'color'

const getAggregateChartsData = (data, aggregate, dateFormat, filters) => {
  console.log(aggregate.dataSet)
  return data.map(el => {
    const { regione, ...rest } = aggregate.dataSet[moment(el.name, dateFormat).format('YYYY-MM-DD')]
    const elementsData = filters.map(filter => ({
      [`${filter}_${regione.slug}`]: rest[filter]
    }))
    return elementsData.reduce((acc, cur) => ({ ...acc, ...el, ...cur }), {})
  })
}

const getAggregateElements = (filters, aggregate, active) => {
  const elements = getLineChartKeysMap(filters)
  if(elements.length === 0) return []
  return [
    ...elements.map(element => ({ ...element, label: `${element.label} ${active.data.regione.denominazione_regione}`})),
    ...elements.map(element => ({
      key: `${element.key}_${aggregate.info.slug}`,
      label: `${element.label} (${aggregate.info.denominazione_regione})`,
      fill: color(element.fill).rotate(30).hex()
    }))
  ]
}

export const useGrowthRates = (data, active, aggregate) => {
  const { log, selectOptions, onSetLog, selectValue } = useLogarithmic()

  const [graphData, setGraphData] = useState(null)
  const [elements, setElements] = useState(null)
  const { filters } = useFilters(false)
  const dateFormat = useSelector(state => intlSelector(state, 'date_format'))
  
  const handleSetLog = useCallback(log => {
    onSetLog(log)
    setGraphData(getLogarithmicObjectData(graphData))
  }, [log, graphData, active])

  useEffect(() => {
    setElements(getLineChartKeysMap(filters))
  }, [data, filters, active])

  useEffect(() => {
    if(aggregate === undefined || aggregate === null) {
      if(elements !== null && !log) {
        setGraphData(getObjectData(data, filters, dateFormat, active))
      } else if (elements !== null && log) {
        const gdata = getObjectData(data, filters, dateFormat, active)
        setGraphData(getLogarithmicObjectData(gdata))
      }
    }
  }, [elements, active])

  useEffect(() => {
    if(aggregate !== undefined && aggregate !== null) {
      const gdata = getAggregateChartsData(
        getObjectData(data, filters, dateFormat, active),
        aggregate,
        dateFormat,
        filters
      )
      onSetLog(true)
      setGraphData(getLogarithmicObjectData(gdata))
      setElements(getAggregateElements(filters, aggregate, active))
    }
  }, [aggregate, filters])

  return {
    log,
    selectOptions,
    onSetLog: handleSetLog,
    selectValue,
    elements,
    graphData
  }
}
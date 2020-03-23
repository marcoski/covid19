import { useSelector } from "react-redux"
import { intlSelector } from "../utils/i18n"
import moment from 'moment'
import { useState, useEffect, useCallback } from "react"

export const useProgressRegion = (data, regions, regionsData) => {
  const { dates, dateFormat, active, onSelectDate } = useProgress(data)
  const [aggregate, setAggregate] = useState(null)

  const handleSetAggregate = aggregate => {
    const data = {
      info: regionsData[active.key.format('YYYY-MM-DD')][aggregate].regione,
      dataSet: Object.keys(regionsData).reduce((acc, cur) => ({ ...acc, [cur]: regionsData[cur][aggregate] }), {}),
      data: regionsData[active.key.format('YYYY-MM-DD')][aggregate],
      prev: regionsData[moment(active.key).subtract(1, 'd').format('YYYY-MM-DD')][aggregate]
    }
    setAggregate(data)
  }

  useEffect(() => {
    if (active !== null && aggregate !== null) {
      const region = aggregate.info.denominazione_regione
      setAggregate({
        ...aggregate,
        data: regionsData[active.key.format('YYYY-MM-DD')][region],
        prev: regionsData[moment(active.key).subtract(1, 'd').format('YYYY-MM-DD')][region]
      })
    }
  }, [active])

  return {
    dates: dates,
    dateFormat: dateFormat,
    active: active,
    selectOptions: Object.keys(regions).map(region => ({ value: region, label: region })),
    onSelectDate: onSelectDate,
    onSetAggregate: handleSetAggregate,
    aggregate: aggregate
  }
}

export const useProgress = data => {
  const dateFormat = useSelector(state => intlSelector(state, 'date_format'))
  const dates = data && Object.keys(data).map(k => moment(k)).sort((a, b) => b.unix() - a.unix())
  const [active, setActive] = useState(null)
  const handleSelectDate = useCallback(key => {
    const foundIndex = dates.findIndex(d => moment.unix(key).format(dateFormat) === d.format(dateFormat))
    if (foundIndex > -1) {
      setActive({
        key: dates[foundIndex],
        data: data[dates[foundIndex].format('YYYY-MM-DD')],
        prev: foundIndex < dates.length - 1 ? data[dates[foundIndex + 1].format('YYYY-MM-DD')] : null
      })
    }
  })

  useEffect(() => {
    if (dates) {
      setActive({
        key: dates[0],
        data: data[dates[0].format('YYYY-MM-DD')],
        prev: data[dates[1].format('YYYY-MM-DD')]
      })
    }
  }, [data])
  return {
    dates: dates,
    dateFormat: dateFormat,
    active: active,
    onSelectDate: handleSelectDate
  }
}
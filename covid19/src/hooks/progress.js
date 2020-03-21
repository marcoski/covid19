import { useSelector } from "react-redux"
import { intlSelector } from "../utils/i18n"
import moment from 'moment'
import { useState, useEffect, useCallback } from "react"

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
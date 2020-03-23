import { useSelector } from "react-redux"
import { useMemo } from "react"
import { createSelector } from 'reselect'
import { useTabs } from "./tabs"

const getLastData = data => data[Object.keys(data)[Object.keys(data).length - 1]] 
const getPrevData = data => data[Object.keys(data)[Object.keys(data).length - 2]]

const lastDataSelector = field => createSelector(
  state => state.data[field],
  data => data && getLastData(data)
)

const lastPrevDataSelector = field => createSelector(
  state => state.data[field],
  data => data !== undefined && getPrevData(data)
)

const regionSelector = field => createSelector(
  state => state.data[field],
  (_, region) => region,
  (data, region) => {
    if(!data) return {}
    if(field === 'byAggregate') return data[region]
    const byDate = {}
    for(const d of Object.keys(data)) {
      byDate[d] = data[d][region]
    }
    return byDate
  }
)

export const useRegionsData = region => {
  const regionSelectorByDate = useMemo(() => regionSelector('byDate'), [])
  const regionSelectorByAggregate = useMemo(() => regionSelector('byAggregate'), [])
  const byDate = useSelector(state => region && regionSelectorByDate(state, region.denominazione_regione))
  const byAggregate = useSelector(state => region && regionSelectorByAggregate(state, region.denominazione_regione))
  const byRegionAggregate = useSelector(state => state.data.byRegionAggregate)
  const { key, onChangeKey } = useTabs('regioni')
  return {
    key: key,
    dataByDate: byDate,
    dataAggregateByDate: byAggregate,
    dataByAggregate: byAggregate && getLastData(byAggregate),
    prevDataByAggregate: byAggregate && getPrevData(byAggregate),
    summary: byDate && getLastData(byDate),
    prevSummary: byDate && getPrevData(byDate),
    byRegionAggregate: byRegionAggregate,
    onChangeKey: onChangeKey
  }
}

export const useData = () => {
  const { byDate, byAggregate } = useSelector(state => state.data)
  const summarySelector = useMemo(() => lastDataSelector('byDate'), [byDate])
  const summaryPrevSelector = useMemo(() => lastPrevDataSelector('byDate'), [byDate])
  const aggregateSelector = useMemo(() => lastDataSelector('byAggregate'), [])
  const prevAggregateSelector = useMemo(() => lastPrevDataSelector('byAggregate'), [])  
  const summary = useSelector(state => summarySelector(state))
  const prevSummary = useSelector(state => summaryPrevSelector(state))
  const lastByAggregate = useSelector(state => aggregateSelector(state))
  const prevByAggregate = useSelector(state => prevAggregateSelector(state))

  const { key, onChangeKey } = useTabs('italia')
  
  return {
    key: key,
    onChangeKey: onChangeKey,
    dataByDate: byDate,
    dataAggregateByDate: byAggregate,
    dataByAggregate: lastByAggregate,
    prevDataByAggregate: prevByAggregate,
    summary: summary,
    prevSummary: prevSummary
  }
}
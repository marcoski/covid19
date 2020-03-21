import { useState, useCallback } from "react"
import { viewsDefaultFilters, viewsGrowthDefaultFilters } from "../../hooks/app"
import { useDispatch } from "react-redux"

export const useTabs = view => {
  const dispatch = useDispatch()
  const [key, setKey] = useState('by-aggregate')
  const handleChangeKey = useCallback(key => {
    setKey(key)
    if(key === 'by-aggregate') {
      dispatch({ type: 'CHANGE_FILTERS_MSG', filters: viewsDefaultFilters[view] })
    } else {
      dispatch({ type: 'CHANGE_FILTERS_MSG', filters: viewsGrowthDefaultFilters[view] })
    }
  })

  return { key: key, onChangeKey: handleChangeKey }
}
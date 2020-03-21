import { useSelector, useDispatch } from "react-redux"
import { useCallback } from "react"

export const useFilters = (radio) => {
  const filters = useSelector(state => state.app.filters)
  const dispatch = useDispatch()

  const handleAddFilter = useCallback(filter => {
    const newFilters = radio ? [filter] : [...filters, ...[filter]]
    dispatch({ type: 'CHANGE_FILTERS_MSG', filters: newFilters })
  })

  const handleRemoveFilter = useCallback(filter => {
    if (radio && filters.includes[filter]) return
    if (radio) return dispatch({ type: 'CHANGE_FILTERS_MSG', filters: [filter] })
    dispatch({ type: 'CHANGE_FILTERS_MSG', filters: filters.filter(f => f !== filter) })
  })

  return {
    filters: filters,
    onAddFilter: handleAddFilter,
    onRemoveFilter: handleRemoveFilter
  }
}
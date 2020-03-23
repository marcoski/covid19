import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom"

export const viewsDefaultFilters = {
  'italia': ['nuovi_attualmente_positivi'],
  'regioni': ['totale_casi'],
  'province': []
}

export const viewsGrowthDefaultFilters = {
  'italia': ['totale_attualmente_positivi', 'dimessi_guariti', 'totale_casi'],
  'regioni': ['totale_casi'],
  'province': []
}

export const useApp = () => {
  const location = useLocation()
  const { pathname } = location
  const match = /^\/(\w+)\/?/.exec(pathname)
  const view = match === null ? 'italia' : match[1]
  const lastUpdate = useSelector(state => state.app.lastUpdate)
  const regions = useSelector(state => state.app.regions)
  const loading = useSelector(state => state.request.loading)
  const dispatch = useDispatch()

  const handleAppData = useCallback(() => {
    dispatch({ type: 'GET_APP_DATA_MSG' })
  }, [dispatch])

  const handleChangeLocation = useCallback(() => {
    dispatch({ type: 'CHANGE_VIEW_MSG', view })
    dispatch({ type: 'GET_DATA_MSG', view })
    dispatch({ type: 'CHANGE_FILTERS_MSG', filters: viewsDefaultFilters[view] })
  })

  useEffect(() => {
    handleAppData()
  }, [])

  useEffect(() => {
    handleChangeLocation()
    return () => dispatch({ type: 'CLEAR_DATA_MSG' })
  }, [location])


  return {
    loading,
    lastUpdate,
    regions
  }
}
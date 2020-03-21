import { useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"

export const useMap = () => {
  const dispatch = useDispatch()
  const currentAggregate = useSelector(state => state.app.currentAggregate)
  const [popoverShow, setPopoverShow] = useState(false)
  const [popoverTarget, setPopoverTarget] = useState(null)
  const [selected, setSelected] = useState(null)

  const handleShowPopover = useCallback((target, selected) => {
    setPopoverShow(true)
    setPopoverTarget(target)
    setSelected(selected)
  })

  const handleHidePopover = useCallback(() => {
    setPopoverShow(false)
    setPopoverTarget(null)
    setSelected(null)
  })

  const handleChangeCurrentAggregate = useCallback(aggregate => {
    dispatch({ type: 'CHANGE_CURRENT_AGGREGATE_MSG', aggregate })
  }, [dispatch])

  const handleClearCurrentAggregate = useCallback(aggregate => {
    dispatch({ type: 'CLEAR_CURRENT_AGGREGATE_MSG'})
  }, [dispatch])

  return {
    popoverShow: popoverShow,
    popoverTarget: popoverTarget,
    selected: selected,
    currentAggregate: currentAggregate,
    onShowPopover: handleShowPopover,
    onHidePopover: handleHidePopover,
    onChangeCurrentAggregate: handleChangeCurrentAggregate,
    onClearCurrentAggregate: handleClearCurrentAggregate
  }
}
import { useState } from "react"

export const useLogarithmic = () => {
  const selectOptions = [{ value: false, label: 'Lineare' }, { value: true, label: 'Logaritmica' }]
  const [log, setLog] = useState(false)
  
  return {
    selectOptions,
    log,
    onSetLog: setLog,
    selectValue: () => selectOptions.find(({ value }) => value === log),
  }
}
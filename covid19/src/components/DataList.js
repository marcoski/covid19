import React from 'react'
import { getDataListKeysMap } from '../utils/data'
import { useFilters } from '../hooks/filters'

const getCheckboxClassName = (radio, activeFilter) => {
  let classes = `far checkbox`
  if (!radio) {
    if (activeFilter) return `${classes} fa-check-square checked`
    return `${classes} fa-square`
  }
  if (activeFilter) return `${classes} fa-check-circle checked`
  return `${classes} fa-circle`
}

const DataListElement = ({ el, data, prev, minimal, activeFilter, onClickFilter, radio }) => {
  const handleClickFilter = () => onClickFilter(el.key)
  return (
    <li className={el.intent !== null ? el.intent : ''}>
      {!minimal &&
        <span onClick={handleClickFilter} className={`${getCheckboxClassName(radio, activeFilter)} mr-2`} />
      }
      {el.label}
      <span className="number">{data[el.key]}</span>
      {prev && <NumberDiff current={data[el.key]} prev={prev[el.key]} />}
      {prev && <Percentage current={data[el.key]} prev={prev[el.key]} />}
    </li>
  )
}

export const MinimalDataList = ({ data }) => {
  const elements = getDataListKeysMap()
    .filter(el => (['dimessi_guariti', 'deceduti', 'totale_casi', 'tamponi'].includes(el.key)))
  return (
    <ul className="covid19__datalist minimal">
      {elements.map(el => <DataListElement key={el.key} el={el} data={data} minimal />)}
    </ul>
  )
}

export const DistrictDataList = ({ data, prev, minimal }) => {
  const elements = getDataListKeysMap()
    .filter(el => (['totale_casi'].includes(el.key)))

  return (
    <>
      {data &&
        <ul className={`covid19__datalist ${minimal && 'minimal'}`}>
          {elements.map(el => <DataListElement key={el.key} prev={prev} el={el} data={data} minimal />)}
        </ul>
      }
    </>
  )
}

const NumberDiff = ({ current, prev }) => {
  const diff = current - prev
  return (
    <span className={`number-diff`}>
      {`${diff >= 0 ? '+' : '-'}${Math.abs(diff)}`}
    </span>
  )
}

const Percentage = ({ current, prev }) => {
  let percentage = 0
  if (prev > 0) percentage = (current / prev) * 100
  const delta = percentage > 0 ? percentage - 100 : 0
  return (
    <span className={`number-diff percentage`}>
      {`${delta >= 0 ? '+' : '-'}${(Math.abs(delta)).toFixed(1)}%`}
      <span className={`ml-2 far ${delta >= 0 ? 'fa-arrow-alt-circle-up' : 'fa-arrow-alt-circle-down'}`}></span>
    </span>
  )
}

const DataList = ({ data, prev, radio }) => {
  const { filters, onAddFilter, onRemoveFilter } = useFilters(radio)
  return (
    <>
      {data &&
        <ul className="covid19__datalist">
          {getDataListKeysMap().map(el => (
            <DataListElement
              key={el.key}
              el={el}
              data={data}
              prev={prev}
              activeFilter={filters.includes(el.key)}
              onClickFilter={filters.includes(el.key) ? onRemoveFilter : onAddFilter}
              radio={radio}
            />
          ))}
        </ul>
      }
    </>
  )
}

export default DataList
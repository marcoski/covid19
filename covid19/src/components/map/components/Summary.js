import React from 'react'
import DataList from '../../DataList'

export const AggregateSummary = ({ update, data, prev, title, onClear, list: AggregateDataList }) => {
  return (
    <div className="aggregate">
      <h3>
        <span>{title} <span className="small">@ {update}</span></span>
        <a href="#" role="button" onClick={onClear}>
          <span className="fas fa-times"></span>
        </a>
      </h3>
      <AggregateDataList data={data} prev={prev} radio />
    </div>
  )
}

const Summary = ({ update, data, prev, title = 'Nazionale' } = {}) => {
  return (
    <div className="summary">
      <h3>{title} <span className="small">@ {update}</span></h3>
      <DataList data={data} prev={prev} radio />
    </div>
  )
}

export default Summary
import React, { useRef } from 'react'
import Nav from 'react-bootstrap/Nav'
import { useProgress } from '../../hooks/progress'
import DataList from '../DataList'
import GrowthRates from '../charts/GrowthRates'

const DateSelector = ({ active, dates, dateFormat, onSelect }) => {
  const handleSelect = key => onSelect(key)
  return (
    <div className="date-selector" id="date-selector">
      <h3>Date</h3>
      <Nav activeKey={active.unix()}>
        {dates.map(k => (
          <Nav.Link key={k.unix()} eventKey={k.unix()} onSelect={handleSelect}>
            <span className="far fa-calendar-alt mr-2"></span>
            {k.format(dateFormat)}
          </Nav.Link>
        ))}
      </Nav>
    </div>

  )
}

const ProgressContainer = ({ data, region }) => {
  const { dates, dateFormat, active, onSelectDate } = useProgress(data)
  const numDates = active !== null ? dates.filter(date => date.isSameOrBefore(active.key)).length : 0
  return (
    <div className="covid19__progress-container">
      {data && active !== null &&
        <>
          <DateSelector active={active.key} dates={dates} dateFormat={dateFormat} onSelect={onSelectDate} />
          <div className="content">
            <h3>Situazione { region ? region.denominazione_regione : 'Nazionale' } del {active.key.format(dateFormat)}</h3>
            <DataList data={active.data} prev={active.prev} />
          </div>
          <div className="growth">
            <h3>Tasso di crescita su {numDates} giorni</h3>
            <GrowthRates data={data} active={active} dates={dates} />
          </div>
        </>
      }
    </div>
  )
}

export default ProgressContainer
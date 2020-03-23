import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Select from 'react-select'
import { useProgress, useProgressRegion } from '../../hooks/progress'
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
            <span>{k.format(dateFormat)}</span>
          </Nav.Link>
        ))}
      </Nav>
    </div>

  )
}

export const ProgressRegionContainer = ({ data, region, regions, regionsData }) => {
  const { 
    dates, dateFormat, active, onSelectDate, selectOptions, aggregate, onSetAggregate 
  } = useProgressRegion(data, regions, regionsData)
  const numDates = active !== null ? dates.filter(date => date.isSameOrBefore(active.key)).length : 0
  const handleSelectRegion = ({ value }) => onSetAggregate(value)
  return (
    <div className="covid19__progress-container">
      {data && active !== null &&
        <>
          <DateSelector active={active.key} dates={dates} dateFormat={dateFormat} onSelect={onSelectDate} />
          <div className="content">
            <div className="views">
              <div className="view">
                <div className="view-title">
                  <h3>{region.denominazione_regione} @ {active.key.format(dateFormat)}</h3>
                  <div className="selector">
                    <Select
                      className="select"
                      options={selectOptions}
                      placeholder="Compara regione..."
                      onChange={handleSelectRegion}
                    />
                  </div>
                </div>
                <DataList data={active.data} prev={active.prev} />
              </div>
              {aggregate !== null &&
                <div className="view aggregate">
                  <h3>{aggregate.info.denominazione_regione} @ {active.key.format(dateFormat)}</h3>
                  <DataList data={aggregate.data} prev={aggregate.prev} />
                </div>
              }
            </div>
            <GrowthRates data={data} active={active} dates={numDates} aggregate={aggregate} />
          </div>
        </>
      }
    </div>
  )
}

const ProgressContainer = ({ data }) => {
  const { dates, dateFormat, active, onSelectDate } = useProgress(data)
  const numDates = active !== null ? dates.filter(date => date.isSameOrBefore(active.key)).length : 0
  return (
    <div className="covid19__progress-container">
      {data && active !== null &&
        <>
          <DateSelector active={active.key} dates={dates} dateFormat={dateFormat} onSelect={onSelectDate} />
          <div className="content">
            <div className="views">
              <div className="view">
                <h3>Nazionale @ {active.key.format(dateFormat)}</h3>
                <DataList data={active.data} prev={active.prev} />
              </div>
            </div>
            <GrowthRates data={data} active={active} dates={numDates} />
          </div>
        </>
      }
    </div>
  )
}

export default ProgressContainer
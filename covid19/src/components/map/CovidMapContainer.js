import React from 'react'
import CovidMap from './CovidMap'
import { useMap } from '../../hooks/map'
import DataList, { MinimalDataList } from '../DataList'
import Summary, { AggregateSummary } from './components/Summary'
import ChartContainer from './components/ChartContainer'
import MapPopover from './components/MapPopover'

const CovidMapContainer = ({ data, prev, lastUpdateStr, summary, prevSummary, dataByDate, dataAggregateByDate }) => {
  const {
    popoverShow,
    popoverTarget,
    currentAggregate,
    selected,
    ...events
  } = useMap()
  const handleShowPopover = (event, selected) => {
    events.onShowPopover(event.target, data[selected.denominazione_regione])
  }
  const handleClear = e => {
    e.preventDefault()
    events.onClearCurrentAggregate()
  }
  return (
    <div className="covid19__map-container">
      {data && summary &&
        <>
          <div className="map">
            <CovidMap
              data={data}
              onShowPopover={handleShowPopover}
              onHidePopover={events.onHidePopover}
              onChangeCurrentAggregate={events.onChangeCurrentAggregate}
              currentAggregate={currentAggregate}
            />
            <MapPopover 
              show={popoverShow} 
              target={popoverTarget} 
              selected={selected} 
              title={selected !== null && selected.regione.denominazione_regione}
              list={MinimalDataList}  
            />
          </div>
          <div className="content-container">
            <div className="content">
              <Summary prev={prevSummary} data={summary} update={lastUpdateStr} />
              {currentAggregate !== '' &&
                <AggregateSummary
                  update={lastUpdateStr}
                  title={currentAggregate}
                  data={data[currentAggregate]}
                  prev={prev[currentAggregate]}
                  onClear={handleClear}
                  list={DataList}
                />
              }
            </div>
            <div className="grow">
              <ChartContainer data={dataByDate} aggregate={dataAggregateByDate} currentAggregate={currentAggregate} />
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default CovidMapContainer
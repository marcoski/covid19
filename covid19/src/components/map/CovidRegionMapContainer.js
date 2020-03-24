import React from 'react'
import CovidRegionMap from './CovidRegionMap'
import { DistrictDataList, MinimalDistrictDataList } from '../DataList'
import { useMap } from '../../hooks/map'
import Summary, { AggregateSummary } from './components/Summary'
import ChartContainer from './components/ChartContainer'
import MapPopover from './components/MapPopover'

const CovidRegionMapContainer = ({ region, data, prev, lastUpdateStr, summary, prevSummary, dataByDate, dataAggregateByDate }) => {
  const {
    popoverShow,
    popoverTarget,
    currentAggregate,
    selected,
    ...events
  } = useMap()
  const handleShowPopover = (event, selected) => {
    events.onShowPopover(event.target, data[selected.denominazione_provincia])
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
            <CovidRegionMap
              region={region}
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
              title={selected !== null && selected.provincia.denominazione_provincia}
              list={MinimalDistrictDataList}
            />
          </div>
          <div className="content-container">
            <div className="content">
              <Summary title={`Situazione ${region.denominazione_regione}`} update={lastUpdateStr} data={summary} prev={prevSummary} />
              {currentAggregate !== '' &&
                <AggregateSummary 
                  update={lastUpdateStr}
                  title={currentAggregate}
                  onClear={handleClear}
                  data={data[currentAggregate]}
                  prev={prev[currentAggregate]}
                  list={DistrictDataList}
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

export default CovidRegionMapContainer
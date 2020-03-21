import React from 'react'
import CovidRegionMap from './CovidRegionMap'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import DataList, { DistrictDataList } from '../DataList'
import { useMap } from '../../hooks/map'
import DailyGrow from '../charts/DailyGrow'

const MapPopover = ({ show, target, selected }) => {
  return (
    <Overlay
      show={show}
      target={target}
      placement="top"
      container={document.getElementsByTagName('body')[0]}
      containerPadding={20}
    >
      {props => {
        let position = { x: 0, y: 0 }
        if (target !== null) {
          const { x, y, width } = target.getBoundingClientRect()
          position = { x: x + width, y }
        }
        return (
          <>
            {selected !== null &&
              <Popover
                className="covid19__popover"
                style={{ ...props.style, opacity: show ? 1 : 0, left: position.x, top: position.y }}
              >
                <Popover.Title as="h3">Situazione {selected.provincia.denominazione_provincia}</Popover.Title>
                <Popover.Content>
                  <DistrictDataList minimal data={selected} />
                </Popover.Content>
              </Popover>
            }
          </>
        )
      }}
    </Overlay>
  )
}

const CovidRegionMapContainer = (
  { region, data, prev, lastUpdateStr, summary, prevSummary, dataByDate, dataAggregateByDate }
) => {
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
            <MapPopover show={popoverShow} target={popoverTarget} selected={selected} />
          </div>
          <div className="content-container">
            <div className="content">
              <div className="summary">
                <h3>Situazione {region.denominazione_regione} <span className="small">@ {lastUpdateStr}</span></h3>
                <DataList data={summary} prev={prevSummary} radio />
              </div>
              <div className="aggregate">
                {currentAggregate !== '' &&
                  <>
                    <h3>
                      <span>{currentAggregate} <span className="small">@ {lastUpdateStr}</span></span>
                      <a href="#" role="button" onClick={handleClear}>
                        <span className="fas fa-times"></span>
                      </a>
                    </h3>
                    <DistrictDataList data={data[currentAggregate]} prev={prev[currentAggregate]} />
                  </>
                }
              </div>
            </div>
            <div className="grow">
              <h3>Incrementi giornalieri</h3>
              <DailyGrow 
                data={dataByDate} 
                aggregate={dataAggregateByDate} 
                currentAggregate={currentAggregate}  
              />
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default CovidRegionMapContainer
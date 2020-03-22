import React from 'react'
import CovidMap from './CovidMap'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import { useMap } from '../../hooks/map'
import DataList, { MinimalDataList } from '../DataList'
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
                <Popover.Title as="h3">Situazione {selected.regione.denominazione_regione}</Popover.Title>
                <Popover.Content>
                  <MinimalDataList data={selected} />
                </Popover.Content>
              </Popover>
            }
          </>
        )
      }}
    </Overlay>
  )
}


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
            {data &&
              <>
                <CovidMap
                  data={data}
                  onShowPopover={handleShowPopover}
                  onHidePopover={events.onHidePopover}
                  onChangeCurrentAggregate={events.onChangeCurrentAggregate}
                  currentAggregate={currentAggregate}
                />
                <MapPopover show={popoverShow} target={popoverTarget} selected={selected} />
              </>
            }
          </div>
          <div className="content-container">
            <div className="content">
              <div className="summary">
                <h3>Nazionale <span className="small">@ {lastUpdateStr}</span></h3>
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
                    <DataList data={data[currentAggregate]} prev={prev[currentAggregate]} radio />
                  </>
                }
              </div>
            </div>
            <DailyGrow data={dataByDate} aggregate={dataAggregateByDate} currentAggregate={currentAggregate} />
          </div>
        </>
      }
    </div>
  )
}

export default CovidMapContainer
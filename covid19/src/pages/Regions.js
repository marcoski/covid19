import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { useRegionsData } from '../hooks/data'
import { useSelector } from 'react-redux'
import { intlSelector } from '../utils/i18n'
import moment from 'moment'
import CovidRegionMapContainer from '../components/map/CovidRegionMapContainer'
import { ProgressRegionContainer } from '../components/progress/ProgressContainer'

const Regions = ({ lastUpdate, region, regions }) => {
  const lastUpdateStr = moment(lastUpdate).format(useSelector(state => intlSelector(state, 'date_format')))
  const {
    key, onChangeKey, dataAggregateByDate, prevDataByAggregate, dataByDate, 
    dataByAggregate, summary, prevSummary, byRegionAggregate
  } = useRegionsData(region)
  const handleChangeTab = key => onChangeKey(key)
  return (
    <Row className="body regions" noGutters>
      <Col>
        {dataAggregateByDate &&
          <>
            <div className="title">
              <h1>{region.denominazione_regione}</h1>
            </div>
            <Tabs activeKey={key} onSelect={handleChangeTab} mountOnEnter unmountOnExit>
              <Tab
                eventKey="by-aggregate"
                title={
                  <>
                    <span className="fas fa-map-marker-alt mr-2"></span>
                    Mappa
                  </>
                }
              >
                <CovidRegionMapContainer
                  region={region}
                  data={dataByAggregate}
                  prev={prevDataByAggregate}
                  lastUpdateStr={lastUpdateStr}
                  summary={summary}
                  prevSummary={prevSummary}
                  dataByDate={dataByDate}
                  dataAggregateByDate={dataAggregateByDate}
                />
              </Tab>
              <Tab
                eventKey="by-date"
                title={
                  <>
                    <span className="fas fa-chart-line mr-2"></span>
                    Andamento
                  </>
                }
              >
                <ProgressRegionContainer 
                  data={dataByDate} 
                  region={region} 
                  regions={regions} 
                  regionsData={byRegionAggregate}  
                />
              </Tab>
            </Tabs>
          </>
        }
      </Col>
    </Row>
  )
}

export default Regions
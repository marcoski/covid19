import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useRegionsData } from '../hooks/data'
import { useSelector } from 'react-redux'
import { intlSelector } from '../utils/i18n'
import moment from 'moment'
import CovidRegionMapContainer from '../components/map/CovidRegionMapContainer'
import ProgressContainer from '../components/progress/ProgressContainer'

const Regions = ({ lastUpdate, region }) => {
  const lastUpdateStr = moment(lastUpdate).format(useSelector(state => intlSelector(state, 'date_format')))
  const {
    key, onChangeKey, dataAggregateByDate, prevDataByAggregate, dataByDate, dataByAggregate, summary, prevSummary
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
                <ProgressContainer data={dataByDate} region={region} />
              </Tab>
            </Tabs>
          </>
        }
      </Col>
    </Row>
  )
}

export default Regions
import React, { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import moment from 'moment'
import { useData } from '../hooks/data'
import CovidMapContainer from '../components/map/CovidMapContainer'
import { intlSelector } from '../utils/i18n'
import { useSelector } from 'react-redux'
import ProgressContainer from '../components/progress/ProgressContainer'

const Italy = ({ lastUpdate }) => {
  const lastUpdateStr = moment(lastUpdate).format(useSelector(state => intlSelector(state, 'date_format')))
  const { 
    key, onChangeKey, dataByDate, dataByAggregate, dataAggregateByDate, prevDataByAggregate, summary, prevSummary 
  } = useData('italia')
  const handleChangeTab = key => onChangeKey(key)
  return (
    <Row className="body italy" noGutters>
      <Col>
        <div className="title">
          <h1>Italia</h1>
        </div>
        <Tabs activeKey={key} onSelect={handleChangeTab} mountOnEnter unmountOnExit>
          <Tab 
            eventKey="by-aggregate" 
            title={
              <>
                <span className="fas fa-tachometer-alt mr-2"></span>
                Panoramica
              </>
            }
          >
            <CovidMapContainer 
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
            <ProgressContainer data={dataByDate} />
          </Tab>
        </Tabs>
      </Col>
    </Row>
  )
}

export default Italy
import React from 'react'
import moment from 'moment'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { intlSelector } from '../utils/i18n'
import { useSelector } from 'react-redux'

const Footer = ({ lastUpdate }) => {
  const lastUpdateStr = moment(lastUpdate).format(useSelector(state => intlSelector(state, 'human_datetime_format')))
  return (
    <footer>
      <Container fluid>
        <Row>
          <Col>
            DatiItalia Covid19 · 2020 · &copy; <a href="http://www.commonhelp.it">Commonhelp</a>
          </Col>
          <Col className="text-center">
            {lastUpdate !== '' &&
              <span className="lastUpdate">Ultimo aggiornamento: {lastUpdateStr}</span>
            }
          </Col>
          <Col className="github">
            <span className="license">
              Licenza <a href="https://github.com/marcoski/covid19/blob/master/LICENSE" target="_new">GNU General Public License v3.0</a>
            </span>
            <a href="https://github.com/marcoski/covid19" target="_new">
              <span className="fab fa-github"></span>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
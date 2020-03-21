import React from 'react'
import Row from 'react-bootstrap/Col'
import Col from 'react-bootstrap/Row'
import { useData } from '../hooks/data'

const Districts = () => {
  const {} = useData()
  return (
    <Row>
      <Col>
        <h1>Hello Districts</h1>
      </Col>
    </Row>
  )
}

export default Districts
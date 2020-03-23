import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../logo.svg'
import dinamo from '../dinamo_logo.png'
import { useParams } from 'react-router-dom'

const Header = ({ regions }) => {
  return (
    <Navbar expand="lg" className="covid19__header">
      <div className="brand">
        <a href="/">
          <img src={logo} width="40" height="40" alt="DatiItalia Covid19" />{' '}
          <div className="title"><h1>DatiItalia Covid19</h1></div>
        </a>
        <div className="subtitle">
          <a href="https://www.dinamopress.it" target="_new">
            <img src={dinamo} alt="Dinamopress.it" />
          </a>
        </div>
      </div>
      <Navbar.Toggle aria-controls="covid19-navbar" />
      <Navbar.Collapse id="covid19-navbar">
        <Nav className="ml-auto">
          <LinkContainer to="/">
            <Nav.Link>Italia</Nav.Link>
          </LinkContainer>
          <NavDropdown alignRight title="Regioni" id="regions-dropdown">
            {Object.keys(regions).map(region => (
              <LinkContainer key={region} to={`/regioni/${regions[region].slug}`}>
                <NavDropdown.Item>{region}</NavDropdown.Item>
              </LinkContainer>
            ))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
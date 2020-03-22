import React from 'react'
import { Route } from 'react-router-dom'
import Header from './Header';
import Container from 'react-bootstrap/Container'
import Italy from '../pages/Italy';
import Regions from '../pages/Regions';
import Footer from './Footer';
import LoadingOverlay from 'react-loading-overlay'
import { useApp } from '../hooks/app'
import CovidSpinner from '../components/CovidSpinner';

const Body = () => {
  const { lastUpdate, regions, loading } = useApp()
  return (
    <LoadingOverlay active={loading} spinner={<CovidSpinner />}>
      {regions &&
        <>
          <Header regions={regions} />
          <Container fluid className="covid19__main">
            <Route exact path="/">
              <Italy lastUpdate={lastUpdate} />
            </Route>
            <Route path="/regioni/:id" component={
              ({ match }) => {
                const region =Object.keys(regions).map(r => regions[r]).find(r => r.codice_regione === parseInt(match.params.id))
                return <Regions lastUpdate={lastUpdate} region={region} />
              }
            } />
          </Container>
          <Footer lastUpdate={lastUpdate} />
        </>
      }
    </LoadingOverlay>
  )
}

export default Body
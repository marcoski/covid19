import React from 'react'
import logo from '../logo.svg'

const CovidSpinner = () => {
  return (
    <div className="loading-spinner">
      <img src={logo} width="130" height="130" alt="" className="rotate" />
      <span className="loading-text">Caricamento dati...</span>
    </div>
  )
}

export default CovidSpinner
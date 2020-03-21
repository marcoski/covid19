import React from 'react'
import italy from '../../italy.json'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from 'react-simple-maps'
import { getMapStyle, getMarkerStyle } from './styles'
import { coordinates, scale } from '../../utils/map'


export const MapCircle = ({ radius }) => {
  return (
    <>
      <circle cx={0} cy={0} r={radius}></circle>
    </>
  )
}

const RegionMarker = ({ region, total, scale, onShowPopover, onHidePopover, onChangeCurrentAggregate, currentAggregate }) => {
  const handleShowPopover = event => onShowPopover(event, region)
  const handleChangeCurrentAggregate = () => {
    onChangeCurrentAggregate(region.denominazione_regione)
  }
  return (
    <Marker
      style={getMarkerStyle(region.denominazione_regione, currentAggregate)}
      coordinates={coordinates(region)}
      onMouseEnter={handleShowPopover}
      onMouseLeave={onHidePopover}
      onClick={handleChangeCurrentAggregate}
    >
      <MapCircle radius={scale(total)} />
    </Marker>
  )
}

const CovidMap = ({ data, onShowPopover, onHidePopover, onChangeCurrentAggregate, currentAggregate }) => {
  return (
    <ComposableMap>
      <ZoomableGroup zoom={25} center={[13, 44.5]}>
        <Geographies geography={italy}>
          {({ geographies }) => geographies.map((geography, index) => (
            <Geography
              key={index}
              geography={geography}
              style={getMapStyle()}
            ></Geography>
          ))}
        </Geographies>
        {Object.keys(data).map(key => (
          <React.Fragment key={key}>
            {data[key].regione &&
              <RegionMarker
                region={data[key].regione}
                total={data[key].totale_casi}
                scale={scale(data)}
                onShowPopover={onShowPopover}
                onHidePopover={onHidePopover}
                onChangeCurrentAggregate={onChangeCurrentAggregate}
                currentAggregate={currentAggregate}
              />
            }
          </React.Fragment>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  )
}

export default CovidMap
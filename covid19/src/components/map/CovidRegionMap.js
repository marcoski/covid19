import React from 'react'
import italy from '../../italy.json'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from 'react-simple-maps'
import { getRegionMapStyle, getDistrictMarkerStyle } from './styles'
import { coordinates, scaleDistrict } from '../../utils/map'
import { MapCircle } from './CovidMap'

const DistrictMarker = ({ district, total, scale, onShowPopover, onHidePopover, onChangeCurrentAggregate, currentAggregate }) => {
  const handleShowPopover = event => onShowPopover(event, district)
  const handleChangeCurrentAggregate = () => {
    onChangeCurrentAggregate(district.denominazione_provincia)
  }
  return (
    <Marker
      style={getDistrictMarkerStyle(district.denominazione_provincia, currentAggregate)}
      coordinates={coordinates(district)}
      onMouseEnter={handleShowPopover}
      onMouseLeave={onHidePopover}
      onClick={handleChangeCurrentAggregate}
    >
      <MapCircle radius={scale(total)} />
    </Marker>
  )
}


const CovidRegionMap = ({ region, data, onShowPopover, onHidePopover, onChangeCurrentAggregate, currentAggregate }) => {
  return (
    <ComposableMap>
      <ZoomableGroup zoom={93} center={[region.long, region.lat + 0.3]}>
        <Geographies geography={italy}>
          {({ geographies }) => geographies.map((geography, index) => (
            <Geography
              key={index}
              geography={geography}
              style={getRegionMapStyle()}
            ></Geography>
          ))}
        </Geographies>
        {Object.keys(data).map(key => (
          <React.Fragment key={key}>
            {data[key].provincia &&
              <DistrictMarker
                district={data[key].provincia}
                total={data[key].totale_casi}
                scale={scaleDistrict(data)}
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

export default CovidRegionMap
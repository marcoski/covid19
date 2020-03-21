import { scaleLinear } from 'd3-scale'

export const coordinates = ({ lat, long }) => [long, lat]

const domain = {
  max: data => Math.max(...Object.keys(data).map(k => data[k].totale_casi)),
  min: data => Math.min(...Object.keys(data).map(k => data[k].totale_casi))
}

export const scale = data => {
  const scale = scaleLinear().domain([domain.min(data), domain.max(data)]).range([0.5, 3])
  return scale
}

export const scaleDistrict = data => (
  scaleLinear().domain([domain.min(data), domain.max(data)]).range([0.1, 0.8])
)
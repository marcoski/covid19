import colors from '../../scss/_variables.scss'
import moment from 'moment'

export const keysMap = {
  ricoverati_con_sintomi: 'Ricoverati con sintomi',
  terapia_intensiva: 'In terapia intensiva',
  totale_ospedalizzati: 'Totale ospedalizzati',
  isolamento_domiciliare: 'In isolamento domiciliare',
  totale_positivi: 'Totale positivi',
  variazione_totale_positivi: 'Variazione totale positivi',
  nuovi_positivi: 'Nuovi Positivi',
  dimessi_guariti: 'Guariti',
  deceduti: 'Deceduti',
  totale_casi: 'Totale casi',
  tamponi: 'Tamponi'
}

export const colorMap = {
  ricoverati_con_sintomi: colors.blue,
  terapia_intensiva: colors.indigo,
  totale_ospedalizzati: colors.purple,
  isolamento_domiciliare: colors.pink,
  totale_positivi: colors.orange,
  dimessi_guariti: colors.teal,
  variazione_totale_positivi: colors.yellow,
  deceduti: colors.green,
  nuovi_positivi: colors.cyan,
  totale_casi: colors.red,
  tamponi: colors.cyan
}

export const getDataListKeysMap = () => Object.keys(keysMap).map(key => {
  let intent = null
  if (['terapia_intensiva', 'totale_ospedalizzati', 'variazione_totale_positivi'].includes(key)) intent = 'intent-warning'
  if (['dimessi_guariti', 'tamponi'].includes(key)) intent = 'intent-success'
  if (['totale_casi', 'deceduti'].includes(key)) intent = 'intent-danger'
  return { key: key, label: keysMap[key], intent }
})

export const getLineChartKeysMap = (filters = []) => Object.keys(keysMap)
  .map(key => ({ key: key, label: keysMap[key], fill: colorMap[key] }))
  .filter(el => filters.includes(el.key))

export const getObjectData = (data, filters, dateFormat, active) => {
  const graph = Object.keys(data).map(k => {
    const obj = { name: moment(k).format(dateFormat) }
    for (const el of filters) {
      obj[el] = data[k][el]
    }
    return obj
  })
  if(active) return graph.filter(el => moment(el.name, dateFormat).isSameOrBefore(active.key))
  return graph
}

export const getYAxisDomain = (data, elements) => {
  const lastData = data[Object.keys(data)[Object.keys(data).length - 1]]
  return [0, Math.max(...elements.map(el => lastData[el.key]))]
}

export const getLogarithmicObjectData = data => data.map(d => {
  for(const key of Object.keys(d)) {
    if(!isNaN(d[key]) && !(d[key] > 0)) {
      d[key] = 1
    }
  }
  return d
})
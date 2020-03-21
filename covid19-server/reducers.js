const moment = require('moment')
module.exports = {
  byDate: data => data.reduce((acc, cur) => {
    const { data, ...rest } = cur
    return { ...acc, [moment(data).format('YYYY-MM-DD')]: { ...rest } }
  }, {}),
  byDateRegione: data => data.reduce((acc, cur) => {
    const { data, stato, denominazione_regione: dr, codice_regione, lat, long, ...rest } = cur
    const date = moment(data).format('YYYY-MM-DD')
    return { 
      ...acc, [date]: { ...acc[date], [dr]: { regione: { codice_regione, lat, long, denominazione_regione: dr }, ...rest } } 
    }
  }, {}),
  byDateProvincia: data => data.reduce((acc, cur) => {
    const { data, denominazione_provincia: dp, ...rest } = cur
    const date = moment(data).format('YYYY-MM-DD')
    return { ...acc, [date]: { ...acc[date], [dp]: { ...rest } } }
  }, {}),
  byProvincia: data => data.reduce((acc, cur) => {
    const {
      denominazione_provincia: dp,
      codice_provincia,
      lat,
      long,
      totale_casi
    } = cur
    if (lat === '0') return acc
    if (dp === 'denominazione_provincia') return acc
    return {
      ...acc,
      [dp]: {
        provincia: { codice_provincia, lat, long }, totale_casi: acc[dp] ? totale_casi : 0
      }
    }
  }, {}),
  byRegioneProvincia: data => data.reduce((acc, cur) => {
    const {
      data,
      denominazione_provincia: dp,
      denominazione_regione: dr,
      codice_provincia,
      lat,
      long,
      totale_casi
    } = cur
    const date = moment(data).format('YYYY-MM-DD')
    if(dr === 'denominazione_regione') return acc
    if(lat === 0) return acc
    return {
      ...acc,
      [dr]: {
        ...acc[dr],
        [date]: {
          ...(acc[dr] ? acc[dr][date] : {}),
          [dp]: {
            ...(!acc[dr] ? {} : !acc[dr][date] ? {} : acc[dr][date][dp]),
            provincia: { denominazione_provincia: dp, codice_provincia, lat, long },
            totale_casi 
          }
        }
      }
    }
  }, {}),
  byRegione: data => data.reduce((acc, cur) => {
    const { data, stato, codice_regione, denominazione_regione: dr, lat, long } = cur
    const date = moment(data).format('YYYY-MM-DD')
    return {
      ...acc,
      [dr]: {
        ...acc[dr],
        regione: { stato, denominazione_regione: dr, codice_regione, lat, long },
        [date]: {
          ricoverati_con_sintomi: acc[dr] ? cur.ricoverati_con_sintomi : 0,
          terapia_intensiva: acc[dr] ? cur.terapia_intensiva : 0,
          totale_ospedalizzati: acc[dr] ? cur.totale_ospedalizzati : 0,
          isolamento_domiciliare: acc[dr] ? cur.isolamento_domiciliare : 0,
          totale_attualmente_positivi: acc[dr] ? cur.totale_attualmente_positivi : 0,
          nuovi_attulmente_positivi: acc[dr] ? cur.nuovi_attulmente_positivi : 0,
          dimessi_guariti: acc[dr] ? cur.dimessi_guariti : 0,
          deceduti: acc[dr] ? cur.deceduti : 0,
          totale_casi: acc[dr] ? cur.totale_casi : 0,
          tamponi: acc[dr] ? cur.tamponi : 0
        }
      }
    }
  }, {}),
  byGeoRegione: data => data.reduce((acc, cur) => {
    const { stato, codice_regione, denominazione_regione: dr, lat, long } = cur
    return {
      ...acc,
      [dr]: { stato, codice_regione, denominazione_regione: dr, lat, long }
    }
  }, {})
}
require('dotenv').config()
const logger = require('./logger').git
const { DATA_REPOSITORY, CRONTAB } = require('./config')
const path = require('path')
const fs = require('fs')
const moment = require('moment')
const git = require('simple-git/promise')
const cron = require('node-cron')
const reducers = require('./reducers')

const readJsonData = dataFilePath => JSON.parse(fs.readFileSync(dataFilePath).toString())

const writeJsonData = (dataFilePath, data) => {
  const json = JSON.stringify(data)
  fs.writeFileSync(dataFilePath, json, 'utf8')
}

const clone = () => {
  if (!fs.existsSync(path.resolve(__dirname, './repository'))) {
    logger.info('clone %s git repository', DATA_REPOSITORY)
    return git.clone(DATA_REPOSITORY, path.resolve(__dirname, './repository'))
  }
  return Promise.resolve()
}


const reduceData = () => {
  logger.info('create data structures')
  const italia = readJsonData(path.resolve(__dirname, './repository/dati-json/dpc-covid19-ita-andamento-nazionale.json'))
  const regioni = readJsonData(path.resolve(__dirname, './repository/dati-json/dpc-covid19-ita-regioni.json'))
  const province = readJsonData(path.resolve(__dirname, './repository/dati-json/dpc-covid19-ita-province.json'))
  writeJsonData(
    path.resolve(__dirname, './data/italia/by-date.json'),
    reducers.byDate(italia)
  )
  writeJsonData(
    path.resolve(__dirname, './data/regioni/by-date.json'),
    reducers.byDateRegione(regioni)
  )
  writeJsonData(
    path.resolve(__dirname, './data/regioni/by-regione.json'),
    reducers.byRegione(regioni)
  )
  writeJsonData(
    path.resolve(__dirname, './data/province/by-date.json'),
    reducers.byDateProvincia(province)
  )
  writeJsonData(
    path.resolve(__dirname, './data/province/by-regione.json'),
    reducers.byRegioneProvincia(province)
  )
  writeJsonData(
    path.resolve(__dirname, './data/province/by-provincia.json'),
    reducers.byProvincia(province)
  )
  writeJsonData(
    path.resolve(__dirname, './data/last-update.json'),
    { data: moment().format('YYYY-MM-DD HH:mm:ss') }
  )
  writeJsonData(
    path.resolve(__dirname, './data/geo-regioni.json'),
    reducers.byGeoRegione(regioni)
  )
}

const pull = () => git(path.resolve(__dirname, './repository')).pull().then(() => reduceData())

const init = () => {
  logger.info('start git check')
  if (!fs.existsSync(path.resolve(__dirname, 'data'))) {
    clone()
      .then(() => {
        logger.info('create data directories')
        fs.mkdirSync(path.resolve(__dirname, './data'))
        fs.mkdirSync(path.resolve(__dirname, './data/italia'))
        fs.mkdirSync(path.resolve(__dirname, './data/regioni'))
        fs.mkdirSync(path.resolve(__dirname, './data/province'))
        reduceData()
      })
  }
}

const crontab = () => {
  logger.info('setup crontab job')
  cron.schedule(CRONTAB, () => {
    logger.info('start crontab job: pull repository to get updates')
    pull()
  })
}

const readByDate = model => readJsonData(path.resolve(__dirname, `./data/${model}/by-date.json`))
const readByRegione = model => readJsonData(path.resolve(__dirname, `./data/${model}/by-regione.json`))
const readByProvincia = model => readJsonData(path.resolve(__dirname, `./data/${model}/by-provincia.json`))


module.exports = {
  init,
  crontab,
  readByDate,
  readByProvincia,
  readByRegione
}



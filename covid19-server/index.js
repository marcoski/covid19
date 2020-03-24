require('dotenv').config()
const express = require('express')
const logger = require('./logger').http
const repository = require('./repository')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 16008
const app = express()
app.use(cors())
repository.init()

if (process.env.NODE_ENV !== 'test') {
  repository.crontab()
}

app.all('/', (req, res) => {
  res.status(200).json(
    {
      title: 'Covid19 Data Aggregation Api',
      endpoints: []
    }
  )
})

app.get('/api/geo/regioni', (req, res) => {
  logger.info('request on %s', req.url)
  res.json(
    JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/geo-regioni.json')))
  )
})

app.get('/api/:model/by-date', (req, res) => {
  logger.info('request on %s for model %s', req.url, req.params.model)
  res.json(repository.readByDate(req.params.model))
})
app.get('/api/:model/by-date/latest', (req, res) => {
  logger.info('request on %s for model %s', req.url, req.params.model)
  const data = repository.readByDate(req.params.model)
  const latest = data[Object.keys(data)[Object.keys(data).length - 1]]
  res.json(latest)
})

app.get('/api/:model/by-regione', (req, res) => {
  logger.info('request on %s for model %s', req.url, req.params.model)
  res.json(repository.readByRegione(req.params.model))
})
app.get('/api/:model/by-provincia', (req, res) => {
  logger.info('request on %s for model %s', req.url, req.params.model)
  res.json(repository.readByProvincia(req.params.model))
})

app.get('/api/last-update', (req, res) => {
  logger.info('request on %s', req.url, req.params.model)
  res.json(
    JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/last-update.json')).toString())
  )
})

/** SUCCESS FALLBACK */
app.use((_, res, next) => {
  if (res.locals.found !== undefined) {
    return res.status(res.locals.status || 200).json(res.locals.data)
  }
  const { NotFoundError } = require('./errors')
  next(new NotFoundError('Resource Not Found'))
})

/** ERROR FALLBACK HANDLER */
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
  if (process.env.NODE_ENV === 'development') throw err
})

const server = require('http').createServer(app)

if (require.main === module) {
  server.listen(port, () => {
    if (process.env.NODE_ENV !== 'test') {
      logger.info(`Service start at port ${port} as ${process.env.NODE_ENV} env`)
    }
  })
} else {
  module.exports = { server, app }
}
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const { server, app } = require('../index')
const should = chai.should()

const fs = require('fs')
const path = require('path')

chai.use(chaiHttp)

describe('Root endpoint', () => {
  it('it should be valid root endpoint', done => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('title')
        res.body.should.have.property('endpoints')
        done()
      })
  })
  it('should get last update', done => {
    chai.request(server)
      .get('/api/last-update')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })
  it('should get italy regions', done => {
    chai.request(server)
      .get('/api/geo/regioni')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })
})

after(() => {
  server.close()
})
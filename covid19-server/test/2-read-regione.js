process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const { server } = require('../index')
const should = chai.should()

chai.use(chaiHttp)

describe('READ COVID19 DATA REGIONAL BASED', () => {
  it('should return data reduced by date', done => {
    chai.request(server)
      .get('/api/regioni/by-date')
      .end((err, res) => {
        res.should.have.status(200)
        console.log(res.body)
        res.body.should.be.a('object')
        done()
      })
  })
  it('should return all data reduced by regione', done => {
    chai.request(server)
      .get('/api/regioni/by-regione')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })
})
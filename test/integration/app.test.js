import dotenv from 'dotenv'
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index'
import { userModel } from '../../server/modules/users/user.model'

dotenv.config()
let expect = chai.expect
chai.use(chaiHttp)

let sampleuserid
let testuserdata = { firstname: 'James', lastname: 'Scott', email: 'test@gmail.com', mobile: '9874567213', password: 'password' }
let token

describe('GET /health-check', () => {
  it('should return 200', async () => {
    let response = await chai.request(server).get('/api/health-check').send()
    expect(response).to.have.status(200)
    expect(response.body.message).to.equal('OK')
  })
})

describe('POST /users', () => {
  it('should return 201', async () => {
    let response = await chai.request(server).post('/api/users').send(testuserdata)
    expect(response).to.have.status(201)
    expect(response.body.data.user).to.be.a('object')
    sampleuserid = response.body.data.user._id
  })
})

describe('POST /auth/login', () => {
  it('should return 200', async () => {
    let response = await chai.request(server).post(`/api/auth/login`).send({ email: testuserdata.email, password: testuserdata.password })
    expect(response).to.have.status(200)
    expect(response.body.data.token).to.be.a('string')
    expect(response.body.data.user).to.be.a('object')
    expect(response.body.data.user).to.be.a('object').that.includes.keys('firstname', 'lastname', 'mobile', 'email')
    token = response.body.data.token
  })
})

describe('GET /users', () => {
  it('should return 200', async () => {
    let response = await chai.request(server).get(`/api/users`).send()
    expect(response).to.have.status(200)
    expect(response.body.data.users).to.be.a('array').of.length(1)
  })
})

describe('GET /auth/profile', () => {
  it('should return 200', async () => {
    let response = await chai.request(server).get(`/api/auth/profile`).set('Authorization', `Bearer ${token}`).send()
    expect(response).to.have.status(200)
    expect(response.body.data.user).to.be.a('object')
    expect(response.body.data.user).to.be.a('object').that.includes.keys('firstname', 'lastname', 'mobile', 'email')
  })
})

describe('PUT /users/:id', () => {
  it('should return 200', async () => {
    testuserdata.mobile = '9873452109'
    let response = await chai.request(server).put(`/api/users/${sampleuserid}`).set('Authorization', `Bearer ${token}`).send(testuserdata)
    expect(response).to.have.status(200)
    expect(response.body.message).to.be.equal('Record updated')
  })
})

describe('GET /auth/login', () => {
  it('should return 404', async () => {
    let response = await chai.request(server).get('/api/auth/login').send({})
    expect(response).to.have.status(404)
  })
})

describe('GET /auth/profile', () => {
  it('should return 401', async () => {
    let response = await chai.request(server).get(`/api/auth/profile`).send()
    expect(response).to.have.status(401)
  })

  it('should return 401 invalid user', async () => {
    await userModel.findOneAndDelete({ _id: sampleuserid })
    let response = await chai.request(server).get(`/api/auth/profile`).set('Authorization', `Bearer ${token}`).send()
    expect(response).to.have.status(401)
    expect(response.body.error).to.be.equal('Invalid user')
  })
})

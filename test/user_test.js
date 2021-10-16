/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const server = require('../src/index');
const Token = require('./setup');
const TEST_USER = require('./data');
const user = require('./setup');
// Assertion Style
chai.should();

chai.use(chaiHttp);

// 怎么取到加密的密码啊，麻!
describe('POST /users/login', () => {
  it('it should be 400', (done) => {
    const { user_name, password } = TEST_USER;
    console.log({ user_name });
    request(server)
      .post('/users/login')
      .send({ user_name, password })
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
  it('it should be 401', (done) => {
    const user_name = 'Test_a3';
    const password = 'Password1';
    request(server)
      .post('/users/login')
      .send({ user_name, password })
      .end((err, response) => {
        response.should.have.status(401);
        done();
      });
  });
});

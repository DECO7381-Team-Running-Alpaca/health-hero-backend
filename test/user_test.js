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

// log in test
describe('POST /users/login', () => {
  // wrong account
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
  // wrong password
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
  // correct account and password
  it('it should be 200', (done) => {
    const { user_name, password } = TEST_USER;
    request(server)
      .post('/users/login')
      .send({ user_name, password })
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});

// log out test
describe('POST /users/logout', () => {
  // correct Token
  it('it should be 200', (done) => {
    request(server)
      .post('/users/logout')
      .set(Token)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});

// Get current users test
describe('GET /users/me', () => {
  // correctly get current test user
  it('it should be 200', (done) => {
    request(server)
      .get('/users/me')
      .send(TEST_USER)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});

// update current user test
describe('PATCH /users/me', () => {
  // request in [password, email, height, weight]
  it('it should be 200', (done) => {
    const { password, email, height, weight } = TEST_USER;
    request(server)
      .PATCH('/users/me')
      .send(password, email)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  // any of request does not in [password, email, height, weight]
  it('it should be 400', (done) => {
    const { password, email, height, weight } = TEST_USER;
    // eslint-disable-next-line no-underscore-dangle
    const { _id } = TEST_USER;
    request(server)
      .PATCH('/users/me')
      .send(password, email, _id)
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
});

// delete current user test
describe('DELETE /users/me', () => {
  // correct Token
  it('it should be 200', (done) => {
    request(server)
      .delete('/users/me')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});

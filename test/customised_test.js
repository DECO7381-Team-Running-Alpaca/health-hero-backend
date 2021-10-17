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
const Preference = require('./data');
const Allergy = require('./data');
// Assertion Style
chai.should();

chai.use(chaiHttp);

// add multiple preferences test
describe('PATCH /preferences', () => {
  // correct account and password
  it('it should be 200', (done) => {
    request(server)
      .patch('/preferences')
      .send(Preference)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});

// add multiple allergies test
describe('PATCH /allergies', () => {
  // correct account and password
  it('it should be 200', (done) => {
    request(server)
      .patch('/allergies')
      .send(Allergy)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});

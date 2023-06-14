const {expect} = require('chai');
const {default: axios} = require('axios');
const validation = require('../validations');
const environment = require('../src/environments/environment');
const respUser = require('../src/response-objects/userDetails');

describe('@GET a single user', () => {
  before('making request', async () => {
    res = await axios.get(`${environment.baseUrl}/users/7`);
  });

  it('Validate response', async () => {
    expect(res.status).to.be.eq(200);
    expect(res.data).to.not.be.eq("");
  });

  it('Validate types', async () => {
    validation.validateValueType(res.data.data, respUser.data);
    validation.validateValueType(res.data.support, respUser.support);
  });

  it('Validate keys', async () => {
    validation.validateKeys(res.data.data, respUser.data);
    validation.validateKeys(res.data.support, respUser.support);
  });
});
const assert = require('assert');
const sinon = require('sinon');
const uuid = require('uuid');

const {checkAccessibility} = require('../index.js');

it('checkAccessibility should return JSON results', () => {
  // Mock ExpressJS 'req' and 'res' parameters
  const name = 'uuid.v4()';
  const req = {
    query: {},
    body: {
        url: 'https://www.uts.edu.au'
    },
  };
  const res = {send: sinon.stub()};

  // Call tested function
  checkAccessibility(req, res);
  console.log(JSON.stringify(res))

  // Verify behavior of tested function
  assert.ok(res.send.calledOnce);
  assert.deepStrictEqual(res.send.firstCall.args, [`Hello ${name}!`]);
});
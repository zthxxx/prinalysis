const Mock = require('mockjs');
const mocks = require('./mocks');
const BaseHost = '/mock';

function fake (url, data) {
  return {
    api: `${BaseHost}${url}`,
    response (req, res) {
      res.json(Mock.mock(data))
    }
  };
}

module.exports = Object.keys(mocks).map((url) => fake(url, mocks[url]));




import Mock from 'mockjs';
import mocks from './mocks';

const BaseHost = '/mock';

function fake (url, data) {
  return {
    api: `${BaseHost}${url}`,
    response (req, res) {
      res.json(Mock.mock(data));
    }
  };
}

module.exports = Object.keys(mocks).map((url) => fake(url, mocks[url]));

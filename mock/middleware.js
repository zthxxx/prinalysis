import Mock from 'mockjs'
import mocks from './mocks'

const BaseHost = '/mock'

const serverFake = (url, data) => {
  return {
    api: `${BaseHost}${url}`,
    response (req, res) {
      res.json(Mock.mock(data))
    }
  }
}

export const interceptFake = () => {
  for (let [url, data] of Object.entries(mocks)) {
    Mock.mock(`${BaseHost}${url}`, data)
  }
}

export default Object.entries(mocks).map(([url, data]) => serverFake(url, data))

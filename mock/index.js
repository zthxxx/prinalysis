import Mock from 'mockjs';
const BaseUrl = 'http://mock.domain/api';

export default Mock.mock(BaseUrl, {
  'name': '@name',
  'age|1-100': 100,
  'color': '@color'
});

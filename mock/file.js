export default {
  '/file/page': {
    result: 'OK',
    info: {
      'state|1': ['EXISTED', 'NO_EXIST'],
      'pageCount': '@natural(1, 10)',
      'direction': '@boolean'
    }
  },
  '/file/url': {
    result: 'OK',
    info: {
      'url': '/mock/file/upload',
    }
  },
  '/file/upload': '',
  '/file/pic/preview': {
    result: 'OK',
    info: {
      'img': '@image(910x1287, @hex, Mock Image Preview)'
    }
  }
}

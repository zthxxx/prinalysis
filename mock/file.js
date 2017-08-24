module.exports = {
  '/file/page': {
    'result|1': ['EXISTED', 'NO_EXIST'],
    'pageCount': '@natural(1, 10)',    // 文件总页数
    'direction': '@boolean',  // 排版方向是否为竖版
  },
  '/file/url': {
    'result': 'OK',
    'accessid': '@id',
    'dir': 'posts/',
    'expire': '',
    'host': 'https://jsonplaceholder.typicode.com/',
    'policy': '',
    'signature': '@guid'
  },
  '/file/upload': '',
  '/file/pic/preview': {
    'result': 'OK',
    'img': 'http://xxx'
  }
};

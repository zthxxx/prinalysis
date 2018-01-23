import { randomAvatar } from './tools'

export default {
  '/file/page': {
    result: 'OK',
    info: {
      'state|1': ['EXISTED', 'NO_EXIST'],
      'pageCount': '@natural(1, 10)',
      'isVertical': '@boolean'
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
  },
  '/file/detail': {
    result: 'OK',
    info: {
      'name|1': ['@csentence().docx', '社會主義の体制改♂革.pdf'],
      'format|1': ['doc', 'xls', 'ppt', 'pdf'],
      pageCount: '@natural(1, 10)',
      vertical: '@boolean',
      'institute|1': ['政治管理学院', '经济贸易学院', '国际交流学院'],
      subject: '毛泽东思想和中国特色社会主义理论体系概论',
      viewed: '@natural(0, 15)',
      upTime: '@now(T)',
      collected: '@natural(0, 5)',
      printed: '@natural(0, 15)',
      download: {
        enable: '@boolean',
        url: '@url'
      },
      uploader: {
        uid: '@id',
        avatar: randomAvatar,
        nickname: '@cname()',
      }
    }
  }
}

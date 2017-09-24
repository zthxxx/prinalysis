import crypto from 'crypto'
import {Random} from 'mockjs'

const md5 = str => crypto.createHash('md5').update(str).digest('hex');

module.exports = {
  '/user/login/state': {
    result: 'OK',
    'info': {
      'nickname|1': ['@name', '@cname'],
      uid: '@id',
      phone: /1[358]\d{9}/,
      avatar: `https://www.gravatar.com/avatar/${md5(Random.email())}?d=retro`,
      lastAddress: ['@province', '@city', '@county'],
      'lastPoint|+1': 1
    }
  },
  '/user/login/QRCode': {
    result: 'OK',
    info: {
      url: '@image(300x300, @hex, Mock QRCode)'
    }
  },
  '/user/info': {
    result: 'OK',
    info: {
      'nickname|1': ['@name', '@cname'],
      uid: '@id',
      phone: /1[358]\d{9}/,
      avatar: `https://www.gravatar.com/avatar/${md5(Random.email())}?d=retro`,
      address: '@county(true)',
      createDate: '@now(T)',
      library: {
        illegalCount: '@natural(0, 1)',
        uploadFileCount: '@natural(1, 10)',
        acceptFileCount: '@natural(1, 5)',
        deleteFileCount: '@natural(0, 3)'
      },
      school: {
        "city": '@province',
        "name": '@city',
        "campus": '@city()大学'
      }
    }
  }
};

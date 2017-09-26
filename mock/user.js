import crypto from 'crypto'
import {Random} from 'mockjs'

const md5 = str => crypto.createHash('md5').update(str).digest('hex');
const getAvatar = () => `https://www.gravatar.com/avatar/${md5(Random.email())}?d=retro&s=96`;

module.exports = {
  '/user/logining': {
    'result|1': ['OK', 'ERROR'],
    'info': {
      'nickname|1': ['@name', '@cname'],
      'uid': '@id',
      'access': 'user',
      'avatar': getAvatar,
      'lastAddress': ['@province', '@city', '@county'],
      'lastPoint|+1': 1
    },
    'message|1': ['此用户已登录', '用户账号或密码错误']
  },
  '/user/logout': {
    'result|1': ['OK', 'ERROR'],
    'message': '此用户未登录，注销失败'
  },
  '/user/login/state/': {
    result: 'OK',
    'info|+1': ["LOGINING", {
      'nickname|1': ['@name', '@cname'],
      'uid': '@id',
      'access': 'user',
      'avatar': getAvatar,
      'lastAddress': ['@province', '@city', '@county'],
      'lastPoint|+1': 1
    }]
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
      'access|1': ['user', 'vendor', 'manager'],
      phone: /1[358]\d{9}/,
      avatar: getAvatar,
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

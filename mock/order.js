import { randomMD5 } from './tools'

export default {
  '/order/verify': {
    'result': 'OK',
    'info': {
      'orderID': '@guid',
      'desc': '《@name.docx》等共2个文件'
    }
  },
  '/order/cancel': {
    'result': 'OK'
  },
  '/order/detail': {
    'result': 'OK',
    'info': {
      'uid': '@id',
      'code': '+86',
      'username': /1[358]\d{9}/,
      'nickname|1': ['@name', '@cname'],
      'orderID': '@id',
      'orderDate': '@now(T)',
      'state|+1': ['PAYING', 'PAID', 'CANCEL', 'REFUNDING', 'REFUNDED'],
      'payway': 'ALIPAY',
      'payDate': '@now(T)',
      'pointName|1': ['@county()大楼点', '@county()广场点'],
      'pointPhone': /\+861[358]\d{9}/,
      'printDate': '@now(T)',
      'pointID|+1': 1,
      'money': '@natural(50, 200)',
      'files|1-3': [
        {
          'fileID': randomMD5,
          'fileName': '@ctitle(3, 8).docx',
          'row': '@natural(1, 2)',
          'col': '@natural(1, 3)',
          'copies': '@natural(1, 5)',
          'size|1': ['A3', 'A4', 'A5'],
          'caliper|+1': ['70g', '80g', '100g'],
          'color|1': ['mono', 'colorful'],
          'side': '@natural(1, 2)',
          'startPage': '@natural(1, 2)',
          'endPage': '@natural(4, 6)',
          'downloadable': '@boolean',
          'downloadUrl': '@url'
        }
      ],
      'settle|1-3': [
        {
          'size|1': ['A3', 'A4', 'A5'],
          'caliper|+1': ['70g', '80g', '100g'],
          'color|1': ['mono', 'colorful'],
          'side': '@natural(1, 2)',
          'unit': '@natural(20, 50)',
          'count': '@natural(1, 5)'
        }
      ]
    }
  },
  '/orders/info': {
    'result': 'OK',
    'info|0-7': [
      {
        'orderID': '@id',
        'orderDate': '@now(T)',
        'state|+1': ['PAYING', 'PAID', 'CANCEL', 'REFUNDING', 'REFUNDED'],
        'money': '@natural(50, 200)',
        'pointName|1': ['@county()大楼点', '@county()广场点'],
        'fileCount': '@natural(1, 5)',
        'filePrename': '@ctitle(3, 8).docx'
      }
    ]
  },
  '/orders/amount': {
    'result': 'OK',
    'info': {
      'ALL': '@natural(3, 20)',
      'PAYING': '@natural(1, 5)',
      'PAID': '@natural(1, 5)',
      'PRINTED': '@natural(1, 5)',
      'FINISH': '@natural(1, 5)',
      'REFUND': '@natural(1, 5)'
    }
  }
}


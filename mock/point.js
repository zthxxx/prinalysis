module.exports = {
  '/point/address': {
    result: 'OK',
    'info|1-3': {
      '北京市': {
        '市辖区|5-10': ['@county'],
        '县|1-10': ['@county']
      },
      '上海市': {
        '市辖区|5-10': ['@county'],
        '县|1-10': ['@county']
      },
      '江苏省': {
        '南京市|5-10': ['@county'],
        '苏州市|5-10': ['@county'],
      }
    }
  },
  '/point/points': {
    result: 'OK',
    'info|2-8': [{
      'pointID|+1': 1,
      'status|1': ['RUNNING', 'SUMMER_HOLIDAY'],
      'pointType|1': ['ATM', 'DISPATCHING'],
      'delivery_scope|1': ['', '@name()广场附近'],
      'delivery_time': '每天中午十二点到两点，每天晚上8点到10点',
      'phone': /1[358]\d{9}/,
      'pointName|1': ['华阳区大楼', '@county()大楼', '@county()广场'],
      'address|1': ['@name()一楼进大门左转', '软件园@region()方向直走'],
      'message|1': ['欢迎使用快印打印~', '新点开张！欢迎使用~'],
      'image': '',
      'takeTime': ['@natural(0, 23)', '@natural(0, 59)', 24, 0],
      'basicPrintItem': {
        'monoSingle': '@natural(10, 50)',
        'monoDuplex': '@natural(10, 50)',
        'colorfulSingle|1': [-1, '@natural(20, 50)'],
        'colorfulDuplex|1': [-1, '@natural(20, 50)'],
        'monoSingleThick': -1,
        'monoDuplexThick': -1,
        'colorfulSingleThick': -1,
        'colorfulDuplexThick': -1
      },
      'printInfo': {
        'maxPageCount': 200,
        'prePrintStart': 500,
        'distributionStart': 1000,
        'distributionCharge_free': 300,
        'distributionCharge': 100
      },
      'preInfo': {
        'maxPageCount': 500,
        'prePrintStart': 500,
        'desc': ''
      },
      'atmInfo': {
        'maxPageCount': 200,
        'desc': ''
      },
      'dispatch': {
        'maxPageCount': 500,
        'distributionStart': 500,
        'distributionCharge_free': 300,
        'distributionCharge': 200,
        'desc': ''
      },
      'minCharge': 0,
      'reduction': {
        'withCoupon': false,
        'newUser': 0,
        'full': [],
        'redPacket': false,
        'activity': []
      }
    }]
  }
};

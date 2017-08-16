let pointsInfo = [{
  'pointId': '0001',
  'status': 'RUNNING',
  'pointType': ['ATM'],
  'delivery_scope': '',
  'delivery_time': '每天中午十二点到两点，每天晚上8点到10点',
  'phoneNumber': '12345678910',
  'printPointName': '华阳区大楼',
  'address': '华阳区大楼一楼进大门左转',
  'message': '欢迎使用快印打印~',
  'imageUrl': require('@/assets/img/print/ATM.jpg'),
  'takeTime': [0, 0, 24, 0],
  'basicPrintItem': {
    'monoSingle': 10,
    'monoDuplex': 15,
    'colorfulSingle': -1,
    'colorfulDuplex': -1,
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
}, {
  'pointId': '0008',
  'status': 'SUMMER_HOLIDAY',
  'pointType': ['DISPATCHING'],
  'delivery_scope': '清水镇广场',
  'delivery_time': '全天接单，当晚配送',
  'phoneNumber': '12345678910',
  'printPointName': '清水镇广场店',
  'address': '清水镇广场南面',
  'message': '优惠券打印更加实惠哦~',
  'imageUrl': require('@/assets/img/print/printPoint.jpg'),
  'takeTime': [0, 0, 24, 0],
  'basicPrintItem': {
    'monoSingle': 10,
    'monoDuplex': 15,
    'colorfulSingle': 80,
    'colorfulDuplex': 160,
    'monoSingleThick': -1,
    'monoDuplexThick': -1,
    'colorfulSingleThick': -1,
    'colorfulDuplexThick': -1
  },
  'printInfo': {
    'prePrintStart': 500,
    'distributionStart': 500,
    'maxPageCount': 100000,
    'distributionCharge_free': 50,
    'distributionCharge': 200,
    'desc': '18:00前下单，当天晚上配送。支持配送清水镇广场。'
  },
  'preInfo': {
    'maxPageCount': 500,
    'prePrintStart': 500,
    'desc': ''
  },
  'atmInfo': {
    'maxPageCount': 10000,
    'desc': ''
  },
  'dispatch': {
    'maxPageCount': 10000,
    'distributionStart': 300, // 配送3元起
    'distributionCharge_free': 50,
    'distributionCharge': 50,
    'desc': '18:00前下单，当天晚上配送。支持配送清水镇广场。'
  },
  'minCharge': 0,
  'reduction': {
    'withCoupon': false, // 不可使用优惠券
    'newUser': 100,   // 新用户立减1元
    'full': [[2000, 300], [5000, 800]], // 满20减3 满50减8
    'redPacket': true, // 红包
    'activity': ['2016_01期末', '2016开学', '2016放假']
  }
}];

export default () => pointsInfo

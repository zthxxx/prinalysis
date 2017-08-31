module.exports = {
  '/order/verify': {
    'result': 'OK',
    'info': {
      'orderID': '@guid',
      'desc': '《@name.docx》等共2个文件'
    }
  },
  '/order/detail': {
    'result': 'OK',
    'info': {
      'orderID': '201708172723119316581112',
      'orderType': 'ATM',
      'orderSecret': '120717116541',
      'orderCode': '61320401',
      'auth': '2411fba29cd8cc72f1ad5a103037fdf9',
      'status': 'TOPAY',
      'money': 10,
      'actual_money': 10,
      'pageCount': 1,
      'orderDate': '1502983017322',
      'payMethod': '',
      'payDate': '',
      'userID': '9bc65f5a98bd0e36ef4bdf81',
      'username': '测试人',
      'phone': '189xxxx1234',
      'PrePointID': '0001',
      'printPointName': '综合楼大厅',
      'printDate': '',
      'actualPointID': '',
      'actualPrintPointName': '',
      'printItemCount': {
        'monoSingle': 1,
        'monoDuplex': 0,
        'colorfulSingle': 0,
        'colorfulDuplex': 0
      },
      'basicPrintItem': {
        'monoSingle': 10,
        'monoDuplex': 15
      },
      'firstFileName': '申报指南.docx',
      'fileCount': 1,
      'files': [{
        'fileID': '3B052B46B7111286E48F7648F76E099A',
        'fileName': '申报指南.docx',
        'direction': true,
        'pageCount_source': 1,
        'pageCount_print': 1,
        'sideCount_print': 1,
        'layout': 1,
        'printMethod': 'monoDuplex',
        'copies': 1,
        'canDownload': true,
        'startPage': 1,
        'endPage': 1,
        'downloadUrl': '/file/3B052B46B7111286E48F7648F76E099A.docx?OSSAccessKeyId=u0pANDsMY6yMrNPz&Expires=1502984817&Signature=t8TLCjeBp1kMqMRK4ZZVnHT8Gk4%3D'
      }],
      'exp': 24,
      'coupon': null,
      'dispatchingInfo': null,
      'errSource': '',
      'errMsg': ''
    }
  }
};


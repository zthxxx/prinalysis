module.exports = {
  '/pay/payment': {
    'result': 'OK',
    'info': {
      'QRCode': '@image(200x200, @hex, Mock QRCode Image)',
      'payform': '<img src="@image(240x240, @hex, Mock QRCode Image)" style="margin-left: 48px;">'
    }
  },
  '/pay/trade': {
    'result': 'OK',
    'info': {
      'state|+1': ['PAYING', 'PAYING', 'PAYING', 'PAYING', 'PAID', 'CANCEL', 'REFUNDING', 'REFUNDED']
    }
  }
};

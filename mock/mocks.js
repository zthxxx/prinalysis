const user = require('./user');
const point = require('./point');
const file = require('./file');
const order = require('./order');
const pay = require('./pay');

module.exports = {
  ...user,
  ...point,
  ...file,
  ...order,
  ...pay
};

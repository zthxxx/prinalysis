import { creatVM } from '../util';
import printFileItem from '$@/UI/PrintFileItem';

let price = [
  {
    size: 'A3',
    caliper: '80g',
    money: {
      colorful: {
        duplex: 40
      }
    }
  }
];

let file = {
  uid: '#1',
  status: 'success',
  percentage: 100,
  size: '2048',
  name: 'mock test file',
  raw: { extension: 'doc', origin: '本地' },
  pageInfo: { pageCount: 5, direction: false }
};

let expectSetting = {
  copies: 1,
  size: 'A3',
  caliper: '80g',
  color: 'colorful',
  side: 2,
  row: 1,
  col: 1,
  startPage: 1,
  endPage: 1
};

describe('PrintFileItem', () => {
  it('print-file-item will rewrite default setting', done => {
    let vm = creatVM(printFileItem, { price, file });
    vm.$nextTick(() => {
      expect(vm.setting).to.deep.equal(expectSetting);
      done();
    });
  });
});

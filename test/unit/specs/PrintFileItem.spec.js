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
  it('print-file-item will rewrite default setting', () => {
    let vm = creatVM(printFileItem, { price, file });
    expect(vm.setting).to.deep.equal(expectSetting);
  });

  it('print-file-item colorable and sideable will be set', () => {
    let vm = creatVM(printFileItem, { price, file });
    expect(vm.colorable).to.deep.equal(price[0].money);
    expect(vm.sideable).to.deep.equal(price[0].money.colorful);
  });

  it('print-file-item layout is times of row and col', () => {
    let vm = creatVM(printFileItem, { price, file });
    vm.setting.row = 3;
    vm.setting.col = 2;
    expect(vm.layout).to.equal(3 * 2);
  });

  it('print-file-item adjust setting will emit update', done => {
    let _price = JSON.parse(JSON.stringify(price));
    _price[0].money.mono = { oneside: 30 };
    let vm = creatVM(printFileItem, { price: _price, file });
    expect(vm.setting.side).to.equal(1);
    vm.$on('update', ({ setting }) => {
      expect(vm.sideable).to.deep.equal(price[0].money.colorful);
      expect(setting).to.deep.equal({
        ...expectSetting
      });
      done();
    });
    vm.setting.color = 'colorful';
  });
});

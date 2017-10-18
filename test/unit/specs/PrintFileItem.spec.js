import { creatVM } from '../util';
import printFileItem from '$@/UI/PrintFileItem';

export const getPrices = () => [
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

const file = {
  uid: '#1',
  status: 'success',
  percentage: 100,
  size: '2048',
  name: 'mock test file',
  raw: { extension: 'doc', origin: '本地' },
  pageInfo: { pageCount: 5, direction: true }
};

const expectSetting = {
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
  let price = getPrices();
  beforeEach(() => {
    price = getPrices();
  });

  it('print-file-item will rewrite default setting', () => {
    let vm = creatVM(printFileItem, { price, file });
    expect(vm.setting).to.deep.equal(expectSetting);
  });

  it('print-file-item colorable and sideable will be set automatically', () => {
    let vm = creatVM(printFileItem, { price, file });
    expect(vm.colorable).to.deep.equal(price[0].money);
    expect(vm.sideable).to.deep.equal(price[0].money.colorful);
  });

  it('print-file-item colorable and sideable will be empty with not price', () => {
    let vm = creatVM(printFileItem, { file });
    expect(vm.colorable).to.be.empty.and.an('object');
    expect(vm.sideable).to.be.empty.and.an('object');
  });

  it('print-file-item colorable will be empty will the setting is wrong', () => {
    let vm = creatVM(printFileItem, { price, file });
    vm.setting.caliper = 'notcaliper';
    expect(vm.colorable).to.be.empty.and.an('object');
  });

  it('print-file-item sizeside set will be rewrite by checked', () => {
    let vm = creatVM(printFileItem, { price, file });
    vm.sizeside = JSON.stringify({
      size: 'A4',
      caliper: '70g',
    });
    expect(vm.setting).to.deep.equal(expectSetting);
  });

  it('print-file-item layout is times of row and col', () => {
    let vm = creatVM(printFileItem, { price, file });
    vm.setting.row = 3;
    vm.setting.col = 2;
    expect(vm.layout).to.equal(3 * 2);
  });

  it('print-file-item layout set will rewrite row and col', () => {
    let vm = creatVM(printFileItem, { price, file });
    for (let layout of Object.keys(vm.layouts)) {
      vm.layout = layout;
      // row and col will be exchange while the direction is true
      expect(vm.setting.row).to.equal(vm.layouts[layout].col);
      expect(vm.setting.col).to.equal(vm.layouts[layout].row);
    }
  });

  it('print-file-item adjust setting will emit update', done => {
    price[0].money.mono = { oneside: 30 };
    let vm = creatVM(printFileItem, { price, file });
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

  it('print-file-item update price will rewrite setting', done => {
    let vm = creatVM(printFileItem, { price, file });
    vm.$set(price[0].money, 'mono', { oneside: 30 });
    vm.$delete(price[0].money, 'colorful');
    vm.$nextTick(() => {
      expect(vm.setting).to.deep.equal({
        ...expectSetting,
        color: 'mono',
        side: 1
      });
      done();
    });
  });

  it('print-file-item update preSetting will rewrite setting', done => {
    let price = getPrices();
    let _preSetting = JSON.parse(JSON.stringify(expectSetting));
    let vm = creatVM(printFileItem, { price, file, preSetting: _preSetting });
    _preSetting.color = 'notcolor';
    _preSetting.side = Infinity;
    vm.$nextTick(() => {
      expect(vm.setting).to.deep.equal({
        ...expectSetting,
        color: 'notcolor',
        side: 1
      });
      done();
    });
  });
});

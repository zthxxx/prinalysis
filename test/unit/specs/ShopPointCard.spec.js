import { creatVM } from '../util';
import shopPointCard from '$@/UI/ShopPointList/ShopPointCard';
import { getPrices } from './PrintFileItem.spec';

export const getPoint = () => ({
  id: 1,
  running: true,
  pointType: 'ATM',
  delivery_scope: '广场附近',
  delivery_time: '每天中午十二点到两点，每天晚上8点到10点',
  phone: '13246874654',
  pointName: '华阳区大楼',
  address: '一楼进大门左转',
  message: '新点开张！欢迎使用~',
  takeTime: [9, 30, 23, 0],
  price: getPrices(),
  colorType: {
    mono: false,
    colorful: true
  }
});

describe('ShopPointCard', () => {
  let point = getPoint();
  beforeEach(() => {
    point = getPoint();
  });

  it('shop-point-card isColorful will return color type list', () => {
    point.colorType.mono = true;
    let vm = creatVM(shopPointCard, { point });
    expect(vm.isColorful(point.colorType)).to.deep.equal(['黑白打印', '彩色打印']);
  });

  it('shop-point-card getFormatTakeTime will return time area', () => {
    let vm = creatVM(shopPointCard, { point });
    expect(vm.getFormatTakeTime(point.takeTime)).to.be.equal('09:30-23:00');
  });

  it('shop-point-card selected will emit select', done => {
    let vm = creatVM(shopPointCard, { point });
    vm.$on('select', selectPoint => {
      expect(selectPoint).to.deep.equal(point);
      done();
    });
    vm.selected();
  });

  it('shop-point-card getPriceList will return unit price list', () => {
    let vm = creatVM(shopPointCard, { point });
    expect(vm.getPriceList(point.price)).to.deep.equal([{
      type: 'A3 80g纸彩色双面',
      price: '￥0.40 / 张'
    }]);
  });
});

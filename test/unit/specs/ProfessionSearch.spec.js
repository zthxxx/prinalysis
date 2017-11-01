import { creatVM } from '../util';
import professionSearch from '$@/UI/DocumentSearch/ProfessionSearch';

const optionalSearchs = [{
  'A城大学': [
    {
      'xxx 学院': {
        '建筑学': { '大一上': ['大学英语(一)', '大学英语(B)'], '大一下': ['大学英语(二)', '大学英语(E)'] },
        '土木工程': { '大一上': ['大学英语(一)', '材料力学(A)', '大学英语(B)', '大学英语(C)'] }
      }
    },
    {
      'XxXxx 学院': {
        '环境工程': { '大一上': ['大学英语(一)', '大学英语(B)'], '大一下': ['大学英语(二)', '大学英语(E)'] },
        '车辆工程': { '大一上': ['大学英语(一)', '材料力学(A)', '大学英语(B)', '大学英语(C)'] }
      }
    }
  ]
}];

const expectSearchs = {
  institute: ['A城大学', 'xxx 学院'],
  major: '建筑学',
  semester: '大一上',
  subject: 'ALL',
  order: 'COLLECTED'
};

describe('ProfessionSearch', () => {
  it('profession-search will emit search while created by institutes', done => {
    let vm = creatVM(professionSearch, { optionalSearchs });
    vm.$on('search', searchs => {
      expect(searchs).to.be.deep.equal(expectSearchs);
      done();
    });
  });
  it('profession-search setOrder will emit search', done => {
    let vm = creatVM(professionSearch, { optionalSearchs });
    let isSetByOrder = false;
    vm.$on('search', searchs => {
      if (isSetByOrder) {
        expect(searchs).to.be.deep.equal(expectSearchs);
        done();
      } else {
        isSetByOrder = true;
        vm.setOrder(expectSearchs.order);
      }
    });
  });
});

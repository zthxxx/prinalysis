import { creatVM } from '../util';
import linkageSelect from '$@/UI/LinkageSelect';

const addresses = [
  {
    province: [
      {
        city: [
          { county: 'id' }
        ]
      }
    ]
  }
];

const expectCurrents = ['province', 'city', 'county'];

describe('LinkageSelect', () => {
  it('linkage-select have default setting', () => {
    let vm = creatVM(linkageSelect);
    expect(vm.currents.length).to.equal(0);
    expect(vm.layerData).to.deep.equal([[]]);
  });

  it('linkage-select currents will selected automatically', () => {
    let vm = creatVM(linkageSelect, { linkageDatas: addresses });
    expect(vm.currents).to.deep.equal(expectCurrents);
  });

  it('linkage-select currents will reselected with default focus', () => {
    let vm = creatVM(linkageSelect,
      {
        linkageDatas: addresses,
        focused: ['province', 'other-city']
      });
    expect(vm.currents).to.deep.equal(expectCurrents);
  });

  it('linkage-select will emit currents', done => {
    let vm = creatVM(linkageSelect, { linkageDatas: addresses }, false);
    vm.$on('currents', currents => {
      expect(currents.length).to.equal(3);
      expect(currents).to.deep.equal(expectCurrents);
      done();
    });
    vm.$mount();
  });

  it('linkage-select will emit track', done => {
    let vm = creatVM(linkageSelect, { linkageDatas: addresses }, false);
    vm.$on('track', track => {
      expect(track).to.equal('id');
      done();
    });
    vm.$mount();
  });

  it('linkage-select will not selected with defaultSelected off', () => {
    let vm = creatVM(linkageSelect,
      {
        linkageDatas: addresses,
        defaultSelected: false
      }
    );
    expect(vm.currents.length).to.equal(0);
    expect(vm.layerData).to.deep.equal([['province'], [], []]);
  });

  it('linkage-select will not emit with defaultSelected off', done => {
    let vm = creatVM(linkageSelect,
      {
        linkageDatas: addresses,
        defaultSelected: false
      },
      false
    );
    vm.$on('track', track => {
      expect(track).to.equal('id');
      done('should not emit with defaultSelected off');
    });
    vm.$mount();
    vm.$nextTick(() => {
      done();
    });
  });
});

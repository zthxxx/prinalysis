import Vue from 'vue';
import spinDot from '$@/Stateless/SpinDot';

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(spinDot);
    const vm = new Constructor({ propsData: { size: 36 } }).$mount();
    expect(vm.sizePx).to.equal('36px');
  });
});

import { creatVM } from '../util';
import depictCard from '$@/Stateless/DepictCard';

const getDepicts = () => [
  {
    title: 'description title',
    depicts: [
      'description 1',
      'description 2'
    ]
  },
  {
    title: 'description title',
    depicts: [
      'description 1',
      'description 2'
    ]
  }
];

describe('DepictCard', () => {
  it('depict-card can creat by default', () => {
    let vm = creatVM(depictCard);
    expect(vm).to.be.an('object').that.is.not.empty;
  });

  it('depict-card description length should be 2 with prop depicts', () => {
    let description = getDepicts();
    let vm = creatVM(depictCard, { description });
    let elms = vm.$el.querySelectorAll('.description > section');
    expect(elms.length).to.be.equal(description.length);
  });

  it('depict-card figcaption length should be 3 with prop title plus depicts', () => {
    let description = getDepicts();
    let vm = creatVM(depictCard, { description });
    let elms = vm.$el.querySelectorAll('.description > section:first-of-type figcaption > p');
    expect(elms.length).to.be.equal(description[0].depicts.length + 1);
  });
});

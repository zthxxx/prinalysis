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

  it('depict-card description length should be 2', () => {
    let description = getDepicts();
    let vm = creatVM(depictCard, { description });
    let elms = vm.$el.querySelectorAll('.description > div');
    expect(elms.length).to.be.equal(description.length);
  });
});

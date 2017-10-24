import { creatVM } from '../util';
import boxCard from '$@/Stateless/BoxCard';

describe('BoxCard', () => {
  it('box-card card-body style should exist by default', () => {
    let vm = creatVM(boxCard);
    let elm = vm.$el.querySelector('.box-card div:last-child');
    expect(elm.classList.contains('card-body')).to.be.true;
  });

  it('box-card card-body style should not exist by noPadding', () => {
    let vm = creatVM(boxCard, { noPadding: true });
    let elm = vm.$el.querySelector('.box-card div:last-child');
    expect(elm.classList.contains('card-body')).to.be.false;
  });

  it('box-card should have not header without title', () => {
    let vm = creatVM(boxCard);
    let elm = vm.$el.querySelector('.box-card div:first-child');
    expect(elm.classList.contains('card-header')).to.be.false;
  });

  it('box-card should have header with title', () => {
    let vm = creatVM(boxCard, { title: 'box card title' });
    let elm = vm.$el.querySelector('.box-card header');
    expect(elm.classList.contains('card-header')).to.be.true;
  });
});

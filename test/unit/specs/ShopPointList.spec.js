import { creatVM } from '../util'
import shopPointList from '$@/UI/ShopPointList'
import { getPoint } from './ShopPointCard.spec'

const points = [getPoint(), getPoint(), getPoint()]

points.forEach(point => { point.id++ })

describe('ShopPointList', () => {
  it('shop-point-list selectPoint will emit focus', done => {
    let vm = creatVM(shopPointList, { points })
    expect(vm.selectedID).to.equal(null)
    let focusPoint = vm.points[0]
    vm.$on('focus', point => {
      expect(point).to.equal(focusPoint)
      expect(vm.selectedID).to.equal(focusPoint.id)
      done()
    })
    vm.selectPoint(focusPoint)
  })
})

import { creatVM } from '../util'
import spinDot from '$@/Stateless/SpinDot'

describe('SpinDot', () => {
  it('spin-dot size default should be 32px', () => {
    let vm = creatVM(spinDot)
    expect(vm.sizePx).to.equal('32px')
  })

  it('spin-dot size could rewrite', () => {
    let vm = creatVM(spinDot, { size: 36 })
    expect(vm.sizePx).to.equal('36px')
  })
})

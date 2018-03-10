import { creatVM } from '../util'
import affix from '$@/Stateless/Affix'

describe('Affix', () => {
  beforeEach(() => {
    window.document.body.style.height = '1200px'
    window.scrollTo(0, 300)
  })

  it('affix default', () => {
    let vm = creatVM(affix)
    vm.updatePosition({ type: 'scroll' })
    expect(vm.offsetTop).to.equal(0)
    expect(vm.offsetBottom).to.equal(null)
    expect(vm.target).to.equal(window)
  })

  it('affix fixed top', () => {
    let vm = creatVM(affix, { offsetTop: 100 })
    vm.updatePosition({ type: 'scroll' })
    expect(vm.offsetTop).to.equal(100)
    expect(vm.offsetBottom).to.equal(null)
    expect(vm.target).to.equal(window)
    expect(vm.affixStyle).to.deep.equal({ left: '0px', width: '0px', top: '100px' })
  })

  it('affix fixed bottom', () => {
    let vm = creatVM(affix, { offsetBottom: 700 })
    vm.updatePosition({ type: 'scroll' })
    expect(vm.offsetTop).to.equal(0)
    expect(vm.offsetBottom).to.equal(700)
    expect(vm.target).to.equal(window)
    expect(vm.affixStyle).to.deep.equal({ left: '0px', width: '0px', bottom: '700px' })
  })

  it('affix change state', done => {
    const onChange = fixed => {
      expect(fixed).to.equal(true)
      done()
    }
    let vm = creatVM(affix, { offsetTop: 100, onChange })
    vm.updatePosition({ type: 'scroll' })
  })

  it('affix change target', async () => {
    let body = window.document.body
    let vm = creatVM(affix)
    expect(vm.target).to.equal(window)
    vm.$set(vm, 'target', body)
    await vm.$nextTick()
    expect(vm.target).to.equal(body)
    vm.$destroy()
  })
})

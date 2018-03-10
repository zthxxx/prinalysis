import { creatVM } from '../util'
import filePageBox from '$@/UI/FilePageBox'

const fetchPage = async () => ({ img: 'xxx.img' })

describe('FilePageBox', () => {
  it('FilePageBox could created default', () => {
    let vm = creatVM(filePageBox, { fetchPage, total: 1 })
    vm.$el.scrollTo(0, 400)
    vm.handleScroll()
    vm.onLoadimg()
    expect(vm.startPage).to.equal(1)
    expect(vm.isMono).to.be.false
  })

  it('FilePageBox change fetchPage', async () => {
    let vm = creatVM(filePageBox, { fetchPage: async () => ({}), total: 1 })
    vm.loading = false
    vm.fetchPage = fetchPage
    await vm.$nextTick()
    expect(vm.pagepics.length).to.equal(2)
    expect(vm.loading).to.be.true
  })

  it('FilePageBox change total', async () => {
    let vm = creatVM(filePageBox, { fetchPage, total: 5 })
    while (!vm.loadEnd) {
      vm.onLoadimg()
      await vm.$nextTick()
    }
    vm.total = 3
    await vm.$nextTick()
    expect(vm.pagepics.length).to.equal(3)
  })
})

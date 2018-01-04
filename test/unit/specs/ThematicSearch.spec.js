import { creatVM } from '../util'
import thematicSearch from '$@/UI/DocumentSearch/ThematicSearch'


const optionalSearchs = {
  '语言类': ['托福', '雅思', 'GRE'],
  '金融类': ['风控', '区块链']
}

const expectSearchs = {
  category: '语言类',
  topic: '托福',
  order: 'COLLECTED'
}

const defaults = {
  category: '金融类',
  topic: '区块链',
  order: 'TIME'
}

describe('ThematicSearch', () => {
  it('thematic-search will emit search while created by optionalSearchs', done => {
    let vm = creatVM(thematicSearch, { optionalSearchs })
    vm.$on('search', searchs => {
      expect(searchs).to.be.deep.equal(expectSearchs)
      done()
    })
  })

  it('thematic-search  should use default by defaultSearchs', done => {
    let defaultSearchs = { ...defaults }
    let vm = creatVM(thematicSearch, { defaultSearchs, optionalSearchs })
    defaultSearchs.order = 'COLLECTED'
    defaultSearchs.order = defaults.order
    vm.$on('search', searchs => {
      expect(searchs).to.be.deep.equal(defaults)
      done()
    })
  })

  it('thematic-search setOrder will emit search', done => {
    let vm = creatVM(thematicSearch, { optionalSearchs })
    let isSetByOrder = false
    vm.$on('search', searchs => {
      if (isSetByOrder) {
        expect(searchs).to.be.deep.equal(expectSearchs)
        done()
      } else {
        isSetByOrder = true
        vm.setOrder(expectSearchs.order)
      }
    })
  })
})

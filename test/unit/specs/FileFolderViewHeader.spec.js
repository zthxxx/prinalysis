import Router from 'vue-router'
import { creatVM } from '../util'
import fileViewHeader from '$@/UI/FileViewHeader'
import folderViewHeader from '$@/UI/FolderViewHeader'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'person-view',
      component: { template: `<div/>` }
    }
  ]
})


describe('File / Folder ViewHeader', () => {
  it('FileViewHeader could created default', () => {
    let vm = creatVM({
      router,
      extends: fileViewHeader
    })
    expect(vm.file.name).to.equal('（加载中 ...）')
    vm.uploader()
    vm.back()
  })

  it('folderViewHeader could created default', () => {
    let vm = creatVM({
      router,
      extends: folderViewHeader
    })
    expect(vm.folder.name).to.equal('（加载中 ...）')
    vm.uploader()
    vm.back()
  })
})

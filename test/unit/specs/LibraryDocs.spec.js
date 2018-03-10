import Router from 'vue-router'
import { creatVM } from '../util'
import docItemCard from '$@/Stateless/LibraryDocs/DocItemCard'
import fileCard from '$@/Stateless/LibraryDocs/FileCard'
import folderCard from '$@/Stateless/LibraryDocs/FolderCard'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'person-view',
      component: { template: `<div/>` }
    }
  ]
})

const file = {
  id: '02',
  name: 'xxxx.docx',
  created: '1509717859134',
  pages: 3,
  format: 'docx',
  collected: 4,
  printed: 5,
  uploader: {
    uid: 'id',
    nickname: 'xxx'
  }
}

const folder = {
  id: '015',
  name: 'xxxx.docx',
  tags: [],
  updated: '1509717859134',
  count: 3,
  view: 5,
  collected: 4,
  uploader: {
    uid: 'id'
  }
}

describe('LibraryDocs', () => {
  it('docItemCard could creat with default', () => {
    let vm = creatVM({
      router,
      extends: docItemCard
    }, { uid: '000' })
    vm.viewPerson()
    expect(vm.uid).to.equal('000')
  })

  it('file-card could creat by docItem', () => {
    let vm = creatVM(fileCard, { docItem: file })
    vm.pushFile()
    expect(vm.id).to.equal(file.id)
  })

  it('folder-card could creat by docItem', () => {
    let vm = creatVM(folderCard, { docItem: folder })
    expect(vm.id).to.equal(folder.id)
    expect(vm.nickname).to.equal('匿名用户')
  })
})


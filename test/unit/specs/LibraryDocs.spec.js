import { creatVM } from '../util'
import fileCard from '$@/Stateless/LibraryDocs/FileCard'
import folderCard from '$@/Stateless/LibraryDocs/FolderCard'

const file = {
  id: '1',
  name: 'xxxx.docx',
  created: '1509717859134',
  pages: 3,
  format: 'docx',
  collected: 4,
  printed: 5,
  uid: 'id',
  user: ''
}

const folder = {
  id: '1',
  name: 'xxxx.docx',
  updated: '1509717859134',
  count: 3,
  collected: 4,
  view: 5,
  uid: 'id',
  user: ''
}

describe('LibraryDocs', () => {
  it('file-card can creat by docItem', () => {
    let vm = creatVM(fileCard, { docItem: file })
    expect(vm).to.be.an('object').that.is.not.empty
  })

  it('folder-card can creat by docItem', () => {
    let vm = creatVM(folderCard, { docItem: folder })
    expect(vm).to.be.an('object').that.is.not.empty
  })
})


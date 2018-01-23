import { creatVM } from '../util'
import printFileList from '$@/UI/PrintFileList'

const handleRemove = () => {}
const handlePreview = () => {}

const file = {
  uid: '#1',
  status: 'success',
  percentage: 100,
  size: '2048',
  name: 'mock test file',
  raw: { extension: 'doc', origin: '本地' },
  pageInfo: { pageCount: 5, isVertical: true }
}

const fileList = [file, file, file]

describe('PrintFileList', () => {
  it('print-file-list can creat by default', () => {
    let vm = creatVM(printFileList, {
      fileList,
      handleRemove,
      handlePreview
    })
    let elms = vm.$el.querySelectorAll('.print-file-list > *')
    expect(elms.length).to.be.equal(fileList.length)
  })
})

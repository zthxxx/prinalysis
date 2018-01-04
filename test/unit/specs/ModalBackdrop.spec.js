import { creatVM } from '../util'
import modalBackdrop from '$@/Stateless/ModalBackdrop'

describe('ModalBackdrop', () => {
  it('modal-backdrop can creat by default', () => {
    let vm = creatVM(modalBackdrop)
    expect(vm).to.be.an('object').that.is.not.empty
  })
})

import { globalMountInstaller } from '@/utils/tools'

import loginCard from './LoginCard'
import filePreview from './FilePreview'
import payBox from './PayBox'

export const POPUP_LOGIN = '$handleLogin'
export const POPUP_PREVIEW = '$preview'
export const POPUP_PAY = '$handlePay'

// import() is lazy-load and cached
const popups = {
  [POPUP_LOGIN]: loginCard,
  [POPUP_PREVIEW]: filePreview,
  [POPUP_PAY]: payBox
}

const install = Vue => {
  for (let [handle, loader] of Object.entries(popups)) {
    globalMountInstaller(handle, loader)(Vue)
  }
}

export default { install }

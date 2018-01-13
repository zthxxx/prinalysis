import { asyncGlobalMountInstaller } from '@/utils/tools'

export const POPUP_LOGIN = '$handleLogin'
export const POPUP_PREVIEW = '$preview'
export const POPUP_PAY = '$handlePay'

// import() is lazy-load and cached
const popups = {
  [POPUP_LOGIN]: () => import(/* webpackChunkName: "POPUPS" */ './LoginCard'),
  [POPUP_PREVIEW]: () => import(/* webpackChunkName: "POPUPS" */ './FilePreview'),
  [POPUP_PAY]: () => import(/* webpackChunkName: "POPUPS" */ './PayBox')
}

const install = Vue => {
  for (let [handle, loader] of Object.entries(popups)) {
    asyncGlobalMountInstaller(handle, loader)(Vue)
  }
}

export default { install }

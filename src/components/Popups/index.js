import { asyncGlobalMountInstaller } from '@/utils/tools';

export const POPUP_LOGIN = '$handleLogin';
export const POPUP_PREVIEW = '$preview';
export const POPUP_PAY = '$handlePay';

// import() is lazy-load and cached
const popups = {
  [POPUP_LOGIN]: () => import('./LoginCard'),
  [POPUP_PREVIEW]: () => import('./FilePreview'),
  [POPUP_PAY]: () => import('./PayBox')
};

const install = Vue => {
  for (let [handle, loader] of Object.entries(popups)) {
    asyncGlobalMountInstaller(loader, handle)(Vue);
  }
};

export default { install };

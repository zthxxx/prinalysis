import { asyncGlobalMountInstaller } from '@/utils/tools';

// import() is lazy-load and cached
const popups = {
  '$handleLogin': () => import('./LoginCard'),
  '$preview': () => import('./FilePreview'),
  '$handlePay': () => import('./PayBox')
};

const install = Vue => {
  for (let [handle, loader] of Object.entries(popups)) {
    asyncGlobalMountInstaller(loader, handle)(Vue);
  }
};

export default { install };

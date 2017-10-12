import { asyncGlobalMountInstaller } from '@/utils/tools';

// import() is lazy-load and cached
let popups = {
  '$handleLogin': () => import('./LoginCard'),
  '$preview': () => import('./FilePreview'),
  '$handlePay': () => import('./PayBox')
};

export default Vue => {
  for (let [handle, loader] of Object.entries(popups)) {
    asyncGlobalMountInstaller(loader, handle)(Vue);
  }
};


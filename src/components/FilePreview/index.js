import filePreview from './FilePreview';
import { globalPopupInstaller } from '@/utils/tools';

filePreview.install = globalPopupInstaller(filePreview, '$preview');

export default filePreview;

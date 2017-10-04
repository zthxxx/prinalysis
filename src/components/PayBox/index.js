import payBox from './PayBox'
import {globalPopupInstaller} from '@/utils/tools'

payBox.install = globalPopupInstaller(payBox, '$handlePay');

export default payBox

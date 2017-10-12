import loginCard from './LoginCard';
import { globalPopupInstaller } from '@/utils/tools';

loginCard.install = globalPopupInstaller(loginCard, '$handleLogin');

export default loginCard;

import { setBaseUrl } from '@/utils/axios';
import * as API from './url';

export * from './point';
export * from './file';
export * from './user';
export * from './order';
export * from './pay';

setBaseUrl(API.BaseUrl);

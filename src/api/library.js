import { get } from '@/utils/axios';
import * as API from './url';

export const getProfession = () => get(API.PROFESSION_SEARCH);

export const getThematic = () => get(API.THEMATIC_SEARCH);

const searchMap = {
  profession: getProfession,
  thematic: getThematic
};

export const getLibOptional = type => searchMap[type]();

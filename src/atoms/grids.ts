import { atom } from 'recoil';

export const savedGridsState = atom({
  key: 'savedGridsState',
  default: [],
});

export default savedGridsState;

import { atom } from "recoil";

export const savedGridsState = atom({
  key: 'savedGridsState',
  default: [],
});

export const newGridModalOpenState = atom({
  key: 'newGridModalOpenState',
  default: false,
});

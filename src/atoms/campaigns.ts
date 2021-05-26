import { atom } from 'recoil';

export const savedCampaignsState = atom({
  key: 'savedCampaignsState',
  default: [],
});

export default savedCampaignsState;

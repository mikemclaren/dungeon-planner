import { atom } from 'recoil';

export type Campaign = {
  name: string
  id: string
}

export const savedCampaignsState = atom({
  key: 'savedCampaignsState',
  default: [],
});

export default savedCampaignsState;

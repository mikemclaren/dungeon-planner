import { atom } from 'recoil';
import NewCampaignModal from '../components/NewCampaignModal';
import NewGridModal from '../components/NewGridModal';

export const ModalComponents = {
  NewCampaign: NewCampaignModal,
  NewGrid: NewGridModal,
};

export enum ModalTypes {
  NewCampaign = 'NewCampaign',
  NewGrid = 'NewGrid',
}

export const modalOpenState = atom({
  key: 'modalOpenState',
  default: null as ModalTypes,
});

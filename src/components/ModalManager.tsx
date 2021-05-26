import React from 'react';
import { useRecoilValue } from 'recoil';
import { ModalComponents, modalOpenState } from '../atoms/modals';

const ModalManager = () => {
  const modalComponentOpen = useRecoilValue(modalOpenState);

  return (
    <>
      {modalComponentOpen && React.createElement(ModalComponents[modalComponentOpen])}
    </>
  );
};

export default ModalManager;

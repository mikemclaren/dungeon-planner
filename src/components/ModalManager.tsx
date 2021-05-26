import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { ModalComponents, modalOpenState } from '../atoms/modals';

const ModalManager = (): ReactElement => {
  const modalComponentOpen = useRecoilValue(modalOpenState);

  return (
    <>
      {modalComponentOpen && React.createElement(ModalComponents[modalComponentOpen])}
    </>
  );
};

export default ModalManager;

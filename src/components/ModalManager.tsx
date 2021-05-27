import { ScaleFade } from '@chakra-ui/transition';
import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { ModalComponents, modalOpenState } from '../atoms/modals';

const ModalManager = (): ReactElement => {
  const modalComponentOpen = useRecoilValue(modalOpenState);

  return (
    <>
      <ScaleFade initialScale={0.9} in={!!modalComponentOpen}>
        {modalComponentOpen && React.createElement(ModalComponents[modalComponentOpen])}
      </ScaleFade>
    </>
  );
};

export default ModalManager;

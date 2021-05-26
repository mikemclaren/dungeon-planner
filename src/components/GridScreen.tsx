import React, {
  ReactElement, useEffect, useRef, useState,
} from 'react';
import { Button } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import {
  Box, Flex, Heading, Text,
} from '@chakra-ui/layout';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@chakra-ui/modal';
import { useToast } from '@chakra-ui/toast';
import { HotKeys } from 'react-hotkeys';
import {
  GiDoorway, GiSave, GiTrashCan,
} from 'react-icons/gi';
import { Redirect, useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useColorModeValue } from '@chakra-ui/color-mode';

import { savedGridsState } from '../atoms/grids';
import { Grid, GridComponent } from './Grid';
import ToolMenu, { Tools } from './ToolMenu';

type Params = {
  gridId: string;
};

const keyMap = {
  SAVE: 'command+s',
};

const GridScreen = ():ReactElement => {
  const params: Params = useParams();
  const grids: Grid[] = useRecoilValue(savedGridsState);
  const [grid, setGrid] = useState<Grid>(null);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tool, setTool] = useState<Tools>(null);
  const bgColor = useColorModeValue('white', 'gray.700');

  const toast = useToast();
  const cancelRef = useRef();

  useEffect(() => {
    const g = grids.find((a) => a.id === params.gridId);

    if (!g) {
      setRedirectToHome(true);
    }

    setGrid(g);
  }, [grids, params]);

  const saveGrid = () => {
    toast({
      title: 'Zone saved.',
      description: 'Totally saved your awesome zone.',
      status: 'success',
      isClosable: true,
      position: 'top',
    });
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const onClose = () => {
    setDeleteModalOpen(false);
  };

  const selectTool = (t: Tools) => () => {
    setTool(t);
  };

  const handlers = {
    SAVE: saveGrid,
  };

  return (
    <>
      {redirectToHome && <Redirect to="/" />}
      {grid && (
        <Box>
          <HotKeys keyMap={keyMap} handlers={handlers}>
            <Flex left="0" top="0" width="100%" position="fixed" padding="2em" bg={bgColor} zIndex="sticky" boxShadow="md">
              <Heading flex={1}>
                <Icon as={GiDoorway} />
                {' '}
                {grid.name}
              </Heading>
              <Box flex={2}>
                <ToolMenu selectTool={selectTool} />

                {tool && (
                <Box boxShadow="inner">
                  <Text>{tool}</Text>
                </Box>
                )}
              </Box>
              <Box flex={1} textAlign="right">
                <Button
                  onClick={saveGrid}
                  leftIcon={<Icon as={GiSave} />}
                  colorScheme="green"
                >
                  Save
                </Button>
                <Button
                  marginLeft="8"
                  onClick={openDeleteModal}
                  leftIcon={<Icon as={GiTrashCan} />}
                  colorScheme="red"
                >
                  Delete
                </Button>
              </Box>
            </Flex>

            <Flex width="100%" marginTop="5em">
              <GridComponent grid={grid} updateGrid={setGrid} />
            </Flex>

            <AlertDialog
              isOpen={deleteModalOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogContent>
                <AlertDialogHeader>Delete Zone</AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can&apos;t undo this action. Like I don&apos;t put it
                  a notebook or anything for safe keeping.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={onClose} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </HotKeys>
        </Box>
      )}
    </>
  );
};

export default GridScreen;

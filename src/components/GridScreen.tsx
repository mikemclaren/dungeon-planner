import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useRef, useState } from "react";
import { HotKeys } from "react-hotkeys";
import { GiDoorway, GiSave, GiTrashCan } from "react-icons/gi";
import { Redirect, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { savedGridsState } from "../atoms/grids";
import { Grid } from "./Grid";

type Params = {
  gridId: string;
};

const keyMap = {
  SAVE: "command+s",
};

const GridScreen = () => {
  const params: Params = useParams();
  const grids: Grid[] = useRecoilValue(savedGridsState);
  const [grid, setGrid] = useState<Grid>(null);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
      title: "Zone saved.",
      description: "Totally saved your awesome zone.",
      status: "success",
      isClosable: true,
      position: "top",
    });
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const onClose = () => {
    setDeleteModalOpen(false);
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
            <Flex width="100%">
              <Heading flex={1}>
                <Icon as={GiDoorway} /> {grid.name}
              </Heading>
              <Box flex={1} textAlign="right">
                <Button
                  onClick={saveGrid}
                  leftIcon={<Icon as={GiSave} />}
                  colorScheme="green"
                >
                  Save Zone
                </Button>
                <Button
                  marginLeft="8"
                  onClick={openDeleteModal}
                  leftIcon={<Icon as={GiTrashCan} />}
                  colorScheme="red"
                >
                  Delete Zone
                </Button>
              </Box>
            </Flex>

            <AlertDialog
              isOpen={deleteModalOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogContent>
                <AlertDialogHeader>Delete Zone</AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action. Like I don't put it
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

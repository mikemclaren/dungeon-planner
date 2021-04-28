import React, { useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { newGridModalOpenState, savedGridsState } from "../atoms/grids";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Field, FieldProps, Form, Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { Cell, Grid } from "./Grid";
import { Redirect } from "react-router";

interface FormValues {
  name: string;
}

const width = 10;
const height = 10;

const createCells = (width: number, height: number): Cell[] => {
  const cells: Cell[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      cells.push({
        location: {
          x,
          y,
        },
        entity: null,
      });
    }
  }

  return cells;
};

const NewGridModal = () => {
  const [redirectToGrid, setRedirectToGrid] = useState<string>(null);
  const newGridModalOpen = useRecoilValue(newGridModalOpenState);
  const setNewGridModalOpen = useSetRecoilState(newGridModalOpenState);
  const setSavedGrids = useSetRecoilState(savedGridsState);

  const initialRef = useRef();

  const initialValues: FormValues = {
    name: "",
  };

  const onClose = () => {
    setNewGridModalOpen(false);
  };

  const createNewZone = (data: FormValues) => {
    const id = uuidv4();

    const grid: Grid = {
      cells: createCells(width, height),
      name: data.name,
      id,
    };

    setSavedGrids((grids: Grid[]) => {
      grids.push(grid);
      return grids;
    });

    setRedirectToGrid(id);
    onClose();
  };

  const validateName = (value: string) => {
    let error;
    if (!value) {
      error = "Yo, the name is kinda required.";
    }

    return error;
  };

  return (
    <>
      {redirectToGrid && <Redirect to={`/grids/${redirectToGrid}`} />}

      <Modal
        isOpen={newGridModalOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Zone</ModalHeader>
          <ModalCloseButton />
          <Formik onSubmit={createNewZone} initialValues={initialValues}>
            <Form>
              <ModalBody>
                <Field name="name" validate={validateName}>
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      isInvalid={form.errors.name && !!form.touched.name}
                    >
                      <FormLabel htmlFor="name">Zone Name</FormLabel>
                      <Input
                        {...field}
                        ref={initialRef}
                        placeholder="Enter a zone name"
                        name="name"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" colorScheme="teal">
                  Create
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewGridModal;

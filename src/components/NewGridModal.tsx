import React, { ReactElement, useRef, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useSetRecoilState } from 'recoil';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import {
  Field, FieldProps, Form, Formik,
} from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from 'react-router';
import { Grid } from './Grid';
import { savedGridsState } from '../atoms/grids';
import { modalOpenState } from '../atoms/modals';

interface FormValues {
  name: string;
}

const WIDTH = 10;
const HEIGHT = 10;

const NewGridModal = (): ReactElement => {
  const [redirectToGrid, setRedirectToGrid] = useState<string>(null);
  const setModalOpen = useSetRecoilState(modalOpenState);
  const setSavedGrids = useSetRecoilState(savedGridsState);

  const initialRef = useRef();

  const initialValues: FormValues = {
    name: '',
  };

  const onClose = () => {
    setModalOpen(null);
  };

  const createNewZone = (data: FormValues) => {
    const id = uuidv4();

    const grid: Grid = {
      width: WIDTH,
      height: HEIGHT,
      name: data.name,
      id,
      entities: [],
      objects: [],
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
      error = 'Yo, the name is kinda required.';
    }

    return error;
  };

  return (
    <>
      {redirectToGrid && <Redirect to={`/grids/${redirectToGrid}`} />}

      <Modal
        isOpen
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

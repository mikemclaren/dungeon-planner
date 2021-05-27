import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, FormControl, FormLabel,
  Input, FormErrorMessage, ModalFooter, Button, Checkbox, VStack,
} from '@chakra-ui/react';
import {
  Formik, Form, Field, FieldProps,
} from 'formik';
import React, { ReactElement, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import savedCampaignsState, { Campaign } from '../atoms/campaigns';
import { modalOpenState } from '../atoms/modals';

interface FormValues {
  name: string;
}

const NewCampaignModal = (): ReactElement => {
  const setModalOpen = useSetRecoilState(modalOpenState);
  const initialRef = useRef();
  const setSavedCampaigns = useSetRecoilState(savedCampaignsState);

  const initialValues: FormValues = {
    name: '',
  };

  const onClose = () => {
    setModalOpen(null);
  };

  const createNewCampaign = (data: FormValues) => {
    const id = uuidv4();

    const campaign: Campaign = { id, ...data };

    setSavedCampaigns((campaigns: Campaign[]) => {
      campaigns.push(campaign);
      return campaigns;
    });

    onClose();
  };

  const validateName = (value: string) => {
    let error;
    if (!value) {
      error = 'The name is kind of...everything, you know?';
    }

    return error;
  };

  return (
    <>
      <Modal
        isOpen
        onClose={onClose}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Campaign</ModalHeader>
          <ModalCloseButton />
          <Formik onSubmit={createNewCampaign} initialValues={initialValues}>
            <Form>
              <ModalBody>
                <VStack justifyContent="left" align="start">
                  <Field name="name" validate={validateName}>
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={form.errors.name && !!form.touched.name}
                      >
                        <FormLabel htmlFor="name">Campaign Name</FormLabel>
                        <Input
                          {...field}
                          ref={initialRef}
                          placeholder="Enter a name for your campaigme"
                          name="name"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="dnd5ePrefill">
                    {({ field }: FieldProps) => (
                      <Checkbox {...field} size="sm" name="dnd5ePrefill" defaultIsChecked>
                        Add DnD5e glossary
                      </Checkbox>
                    )}
                  </Field>
                </VStack>
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

export default NewCampaignModal;

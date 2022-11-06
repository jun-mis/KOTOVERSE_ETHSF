import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  InputRightAddon,
  InputGroup,
} from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';

export type ListContentFormType = {
  onSave: (price: string) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  isPending: boolean;
};
const ListContentForm = ({ onSave, isOpen, onClose, isPending }: ListContentFormType) => {
  const initialRef = React.useRef(null);

  const [price, setPrice] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value)) && !value.match(/^\d+(\.\d+)?$/)) return;
    if (value === '') return setPrice('');

    setPrice(value);
  };

  const handleClickSave = async () => {
    await onSave(price);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>List your content on the market place</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <InputGroup size="sm">
              <Input ref={initialRef} value={price} onChange={handleChange} placeholder="10" disabled={isPending} />
              <InputRightAddon children="MATIC" />
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClickSave} isLoading={isPending}>
            Save
          </Button>
          <Button onClick={onClose} isDisabled={isPending}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ListContentForm;

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
} from '@chakra-ui/react';

export type CompleteModalType = {
  novelName: string;
  onComplete: () => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  isPending: boolean;
};
const CompleteModal = ({ novelName, onComplete, isOpen, onClose, isPending }: CompleteModalType) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent my={'auto'}>
        <ModalHeader>Are you sure to complete this novel?</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text>No more content can be added to this novel after completing the novel.</Text>
          <Text>
            Do you want to complete "<span style={{ fontStyle: 'italic', fontWeight: 700 }}>{novelName}</span>"?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} isDisabled={isPending} mr={3}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onComplete} isLoading={isPending}>
            Complete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CompleteModal;

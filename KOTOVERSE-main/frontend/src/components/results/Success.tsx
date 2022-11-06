import { Box, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { ResultProps } from '.';
import MessagePart from './MessagePart';

export const Success = ({ message, isOpen, onClose }: ResultProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent my={'auto'}>
        <Box textAlign="center" py={10} px={6}>
          <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
          <MessagePart heading="Success" {...{ message, onClose }} />
        </Box>
      </ModalContent>
    </Modal>
  );
};

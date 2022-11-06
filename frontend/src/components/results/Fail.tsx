import { Box, Flex, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { ResultProps } from '.';
import MessagePart from './MessagePart';

export const Fail = ({ message, isOpen, onClose }: ResultProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent my={'auto'}>
        <Box textAlign="center" py={10} px={6}>
          <Box display="inline-block">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg={'red.500'}
              rounded={'50px'}
              w={'55px'}
              h={'55px'}
              textAlign="center"
            >
              <CloseIcon boxSize={'20px'} color={'white'} />
            </Flex>
          </Box>
          <MessagePart heading="Something went wrong..." {...{ message, onClose }} />
        </Box>
      </ModalContent>
    </Modal>
  );
};

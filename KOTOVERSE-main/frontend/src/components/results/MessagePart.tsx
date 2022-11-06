import { Heading, VStack, Text, Button } from '@chakra-ui/react';
import { ResultProps } from '.';

type MessagePartProps = Omit<ResultProps, 'isOpen'> & { heading: string };

const MessagePart = ({ heading, message, onClose }: MessagePartProps) => {
  return (
    <>
      <Heading as="h2" size="lg" mt={6} mb={2} color={'whiteAlpha.900'}>
        {heading}
      </Heading>
      <VStack spacing={5}>
        <Text color={'gray.500'}>{message}</Text>
        <Button onClick={onClose}>Close</Button>
      </VStack>
    </>
  );
};

export default MessagePart;

import { SITE_DIRECTORY_PATHS } from '@/utils/constants/links';
import { VStack, Heading, Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

type NovelNotFoundProps = {
  message: string;
};

const NovelNotFound = ({ message }: NovelNotFoundProps) => {
  return (
    <VStack spacing={5} w={'100%'} h={'100%'}>
      <Heading>{message}</Heading>
      <Link to={`/${SITE_DIRECTORY_PATHS.CREATE}`}>
        <Button>Go create a novel</Button>
      </Link>
    </VStack>
  );
};

export default NovelNotFound;

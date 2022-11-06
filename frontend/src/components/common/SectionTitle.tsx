import { Box, Heading } from '@chakra-ui/react';

type SectionTitleProps = {
  title: string;
};

function SectionTitle({ title }: SectionTitleProps) {
  return (
    <Box w={'100%'} textAlign={'left'}>
      <Heading fontSize={'3xl'} color={'whiteAlpha.800'}>
        {title}
      </Heading>
    </Box>
  );
}

export default SectionTitle;

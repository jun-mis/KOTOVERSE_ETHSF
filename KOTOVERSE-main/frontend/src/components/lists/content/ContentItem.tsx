import { NovelContentType } from '@/types/novels';
import { shortenAddress } from '@/utils/address';
import { formatDate, toDate } from '@/utils/dates';
import { VStack, HStack, Heading, Flex, Text, Box, useClipboard } from '@chakra-ui/react';
import { BsFillFilePersonFill } from 'react-icons/bs';

type ContentItemProps = {
  part: number;
  novelContent: NovelContentType;
};

const ContentItem = ({ novelContent, part }: ContentItemProps) => {
  const { hasCopied, onCopy } = useClipboard(novelContent.creator);

  return (
    <VStack key={novelContent.tokenId.toString()} w={'100%'} alignItems={'flex-start'} spacing={3}>
      <HStack spacing={5}>
        <Heading size={'md'} color={'whiteAlpha.800'}>
          {part}
        </Heading>
        <HStack spacing={5}>
          <Text color={'whiteAlpha.800'}>{formatDate(toDate(novelContent.createdAt.toNumber()))}</Text>
          <Flex alignItems={'center'} color={'whiteAlpha.800'}>
            <BsFillFilePersonFill size={15} />
            <Text color={'whiteAlpha.800'} onClick={onCopy} _hover={{ cursor: 'pointer' }}>
              {hasCopied ? 'Copied' : shortenAddress(novelContent.creator)}
            </Text>
          </Flex>
        </HStack>
      </HStack>
      <Box w={'100%'}>
        <Text color={'whiteAlpha.900'}>{novelContent.content}</Text>
      </Box>
    </VStack>
  );
};

export default ContentItem;

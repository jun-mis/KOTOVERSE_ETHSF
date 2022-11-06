import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsFillFilePersonFill } from 'react-icons/bs';
import { NovelContentType } from '@/types/novels';
import { shortenAddress } from '@/utils/address';
import { formatDate, toDate } from '@/utils/dates';
import ContentItem from './ContentItem';

type ContentListProps = {
  novelContents: NovelContentType[];
};

const ContentList = React.memo(({ novelContents }: ContentListProps) => {
  return (
    <VStack w={'100%'} alignItems={'flex-start'} spacing={10}>
      {novelContents.map((content, idx) => (
        <ContentItem key={content.tokenId.toString()} novelContent={content} part={idx + 1} />
      ))}
    </VStack>
  );
});

export default ContentList;

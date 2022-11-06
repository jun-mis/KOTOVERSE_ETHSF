import { useNovelContract } from '@/hooks/useNovelContract';
import { NovelSnippetType } from '@/types/novels';
import { shortenAddress } from '@/utils/address';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { formatDate, getHourAgo, getMinAgo, toDate, withinOneDay, withinOneHour } from '@/utils/dates';
import { Box, Center, Flex, Heading, Image, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

type NovelItemProps = {
  novel: NovelSnippetType;
};

const NovelItem = ({ novel }: NovelItemProps) => {
  const [contentCount, setContentCount] = useState(1);
  const novelContract = useNovelContract();

  useEffect(() => {
    const load = async () => {
      const novelContents = await novelContract?.getAllNovelContents(novel.id);

      setContentCount(novelContents?.length || 1);
    };

    load();

    return () => {};
  }, []);
  var a = Math.floor(Math.random() * 10 + 1);

  return (
    <Center w={'100%'} h={'100%'}>
      <Box
        maxW={'300px'}
        minH={'250px'}
        w={'full'}
        h={'100%'}
        bg={useColorModeValue('#171334', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <VStack>
          <Image src={`/bookCover/${a}.png`} h={'280px'} w={'100%'} />
        </VStack>
        <Flex w={'100%'} h={'100%'} flexDirection={'column'} justifyContent={'space-between'}>
          <Stack w={'100%'} mb={3} p={6}>
            <VStack alignItems={'flex-start'} spacing={0} mb={2}>
              <Text
                color={'green.500'}
                textTransform={'uppercase'}
                fontWeight={800}
                fontSize={'sm'}
                letterSpacing={1.1}
              >
                {novel.category}
              </Text>
              <Text fontSize={'sm'} color={'gray'}>
                {withinOneHour(novel.updatedAt.toNumber())
                  ? `${getMinAgo(novel.updatedAt.toNumber())}mins ago`
                  : withinOneDay(novel.updatedAt.toNumber())
                  ? `${getHourAgo(novel.updatedAt.toNumber())}hours ago`
                  : ''}
              </Text>
            </VStack>
            <Heading
              color={useColorModeValue('whiteAlpha.800', 'white')}
              fontSize={'xl'}
              fontFamily={'body'}
              w={'100%'}
              noOfLines={3}
            >
              {novel.title}
            </Heading>
            {/* WHEN NOVEL EXCERPT IS READY */}
            {/* <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              </Text> */}
            <Box my={3}>
              <Text color={'gray.500'} fontWeight={500}>
                Part {contentCount} Ended
              </Text>
            </Box>
          </Stack>

          <Stack direction={'row'} spacing={4} align={'center'}>
            <Jazzicon diameter={40} seed={jsNumberForAddress(novel.creator)} />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600} color={'whiteAlpha.300'}>
                {shortenAddress(novel.creator)}
              </Text>
              <Text color={'gray.500'}>{formatDate(toDate(novel.createdAt.toNumber()))}</Text>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </Center>
  );
};

export default NovelItem;

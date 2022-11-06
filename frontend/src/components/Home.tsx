import { Box, Button, Heading, VStack, Flex } from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import useAuth from '@/context/auth';
import { useNovelContract } from '@/hooks/useNovelContract';
import { NovelSnippetType } from '@/types/novels';
import { isChainAllowed } from '@/utils/switchChain';
import Loading from './common/Loading';
import NovelList from './lists/novel/NovelList';
import { sortByUpdatedAt } from '@/utils/list';
import useResult from '@/hooks/useResult';
import { Fail } from './results';
import { Link } from 'react-router-dom';
import { SITE_DIRECTORY_PATHS } from '@/utils/constants/links';
import SectionTitle from './common/SectionTitle';
import { HomeLeft } from './common/HomeLeft';
import NovelItem from './lists/novel/NovelItem';

const Home = () => {
  const { accountId, chainId, connect, switchChain, isLoading } = useAuth();
  const [novels, setNovels] = useState<NovelSnippetType[]>();

  const { setStatus, isFailOpen } = useResult();

  const novelContract = useNovelContract();

  useEffect(() => {
    const load = async () => {
      if (!novelContract) return;

      try {
        const novels: NovelSnippetType[] = await novelContract.getAllNovels();
        console.log('novel : ', novels);

        setNovels(novels);
      } catch (e) {
        console.error('HOME ERROR : ', e);
        setStatus('fail');
      }
    };

    load();
  }, [chainId, accountId]);

  const switchToMumbai = async () => {
    // TODO: change to Polygon
    connect();
    await switchChain('MUMBAI');
  };

  const chainAllowed = chainId && isChainAllowed(chainId);

  if (!isLoading && !accountId) {
    return (
      <VStack w={'100%'}>
        <Heading size={'lg'} color={'red.400'}>
          PLEASE CONNECT TO METAMASK
        </Heading>
        <Button onClick={switchToMumbai}>Connect</Button>
      </VStack>
    );
  }

  if (accountId && !chainAllowed) {
    return (
      <VStack w={'100%'}>
        <Heading size={'lg'} color={'red.400'}>
          PLEASE SWITCH THE CHAIN TO MUMBAI
          {/* TODO: switch NETWORK function */}
        </Heading>
        <Button onClick={switchToMumbai}>Switch</Button>
      </VStack>
    );
  }

  const closeModal = () => {
    setStatus(undefined);
    location.reload();
  };

  if (!novels)
    return (
      <>
        <Fail isOpen={isFailOpen} message={'Please try again'} onClose={closeModal} />
        <Loading />
      </>
    );

  return (
    <VStack w={'100%'} h={'100%'} spacing={5} pb={20}>
      {novels.length == 0 && (
        <VStack w={'100%'}>
          <Heading>No novel found</Heading>
          <Link to={'/create'}>
            <Button>Go create a novel</Button>
          </Link>
        </VStack>
      )}
      {novels.length > 0 && (
        <VStack spacing={20} w={'100%'}>
          <Flex my={'10'}>
            <Box w={'60%'}>
              <HomeLeft />
            </Box>
            <Box w={'40%'} mt={'30'} ml={'100px'}>
              <NovelItem novel={novels[0]} />
            </Box>
          </Flex>
          <VStack spacing={5} w={'100%'}>
            <SectionTitle title={'Recent Updates'} />
            <NovelList novels={sortByUpdatedAt([...novels]).slice(0, 6)} />
            <Box>
              {novels.length > 6 && (
                <Link to={`/${SITE_DIRECTORY_PATHS.RECENT}`}>
                  <Button>Show more</Button>
                </Link>
              )}
            </Box>
          </VStack>
          <VStack spacing={5} w={'100%'}>
            <SectionTitle title={'Completed'} />
            <NovelList
              novels={sortByUpdatedAt([...novels])
                .filter((novel) => novel.isCompleted)
                .slice(0, 6)}
            />
            <Box>
              {novels.length > 6 && (
                <Link to={`/${SITE_DIRECTORY_PATHS.COMPLETED}`}>
                  <Button>Show more</Button>
                </Link>
              )}
            </Box>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

export default Home;

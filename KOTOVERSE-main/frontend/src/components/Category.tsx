import { useNovelContract } from '@/hooks/useNovelContract';
import useResult from '@/hooks/useResult';
import { NovelSnippetType } from '@/types/novels';
import { sortByUpdatedAt } from '@/utils/list';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './common/Loading';
import NovelNotFound from './common/NovelNotFound';
import NovelList from './lists/novel/NovelList';
import { Fail } from './results';

const Category = () => {
  const { name } = useParams();
  const [novels, setNovels] = useState<NovelSnippetType[]>();
  const { setStatus, isFailOpen } = useResult();
  const novelContract = useNovelContract();

  const closeModal = () => {
    setStatus(undefined);
    location.reload();
  };

  useLayoutEffect(() => {
    const load = async () => {
      console.log('Category render');

      if (!novelContract) return;

      try {
        const novels = await novelContract.getAllNovels();

        const sorted = sortByUpdatedAt([...novels]);

        setNovels(sorted);
      } catch (e) {
        console.error('Category ERROR : ', e);
        setStatus('fail');
      }
    };

    load();
  }, [novelContract]);

  const count = novels?.filter((novel) => novel.category === name?.replace('-', '/')).length || 0;
  const replacedName = name?.replace(' - ', ' / '); // spaces needed

  if (!novels)
    return (
      <>
        <Fail isOpen={isFailOpen} message={'Please try again'} onClose={closeModal} />
        <Loading />
      </>
    );

  return (
    <VStack w={'100%'} h={'100%'} spacing={5}>
      {count == 0 && <NovelNotFound message={`No novels found in ${replacedName}`} />}
      {count > 0 && replacedName && (
        <VStack w={'100%'} spacing={10}>
          <Box w={'100%'} textAlign={'left'}>
            <Heading fontSize={'3xl'} textAlign={'left'} fontStyle={'italic'} color={'whiteAlpha.900'}>
              {replacedName} <span style={{ fontStyle: 'normal' }}>novels</span>
            </Heading>
          </Box>
          <NovelList novels={novels.filter((novel) => novel.category === replacedName)} />
        </VStack>
      )}
    </VStack>
  );
};

export default Category;

import { useNovelContract } from '@/hooks/useNovelContract';
import useResult from '@/hooks/useResult';
import { NovelSnippetType } from '@/types/novels';
import { sortByUpdatedAt } from '@/utils/list';
import { VStack, Heading, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './common/Loading';
import SectionTitle from './common/SectionTitle';
import NovelList from './lists/novel/NovelList';
import { Fail } from './results';

const Completed = () => {
  const [novels, setNovels] = useState<NovelSnippetType[]>();
  const { setStatus, isFailOpen } = useResult();
  const novelContract = useNovelContract();

  const closeModal = () => {
    setStatus(undefined);
    location.reload();
  };

  useEffect(() => {
    const load = async () => {
      if (!novelContract) return;

      try {
        const novels = await novelContract.getAllNovels();

        const sorted = sortByUpdatedAt([...novels]).filter((novel) => novel.isCompleted);

        setNovels(sorted);
      } catch (e) {
        console.error('Completed ERROR : ', e);
      }
    };

    load();
    return () => {};
  }, [novelContract]);

  if (!novels)
    return (
      <>
        <Fail isOpen={isFailOpen} message={'Please try again'} onClose={closeModal} />
        <Loading />
      </>
    );

  return (
    <VStack w={'100%'} h={'100%'} spacing={5}>
      {novels.length == 0 && (
        <VStack w={'100%'}>
          <Heading>No novel found</Heading>
          <Link to={'/create'}>
            <Button>Go create a novel</Button>
          </Link>
        </VStack>
      )}
      {novels.length > 0 && (
        <VStack spacing={10} w={'100%'}>
          <SectionTitle title={'Completed Novels'} />
          <NovelList novels={novels} />
        </VStack>
      )}
    </VStack>
  );
};

export default Completed;

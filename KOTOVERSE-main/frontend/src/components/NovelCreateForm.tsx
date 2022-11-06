import useAuth from '@/context/auth';
import { Flex, Box } from '@chakra-ui/react';
import Loading from './common/Loading';
import NovelForm from './forms/NovelForm';

const NovelCreateForm = () => {
  const { accountId } = useAuth();

  if (!accountId) return <Loading />;

  return (
    <Box w={'100%'}>
      {/* Mobile */}
      <Flex display={{ base: 'flex', md: 'none' }} w={'100%'}>
        <NovelForm />
      </Flex>
      {/* Desktop */}
      <Flex display={{ base: 'none', md: 'flex' }} w={'100%'}>
        <Box w={'80%'} mx={'auto'}>
          <NovelForm />
        </Box>
      </Flex>
    </Box>
  );
};

export default NovelCreateForm;

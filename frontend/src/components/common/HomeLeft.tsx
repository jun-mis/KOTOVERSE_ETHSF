import { Box, Button, Flex, Text, Link } from '@chakra-ui/react';
import { SITE_DIRECTORY_PATHS } from '@/utils/constants/links';

export function HomeLeft(): JSX.Element {
  return (
    <Box mt={'10'}>
      <Text color={'whiteAlpha.900'} fontSize={'7xl'} fontWeight={'extrabold'}>
        Power to the Indie Authors.
      </Text>
      <Text color={'whiteAlpha.900'} fontWeight={'black'} mt={'10'}>
        KOTOVERSE is the world's first digital novel marketplace where writers earn revenue easily by selling novel
        NFTs.
      </Text>
      <Flex direction={'row'} mt={'20'}>
        <Button
          w={'170px'}
          mr={'20'}
          borderRadius={'30px'}
          bgColor={'#bd3fc1'}
          color={'whiteAlpha.700'}
          _hover={{ bgColor: '#171334' }}
        >
          <Link _hover={{ textDecoration: 'none' }} href={`/${SITE_DIRECTORY_PATHS.COMPLETED}`}>
            Completed →
          </Link>
        </Button>
        <Button w={'170px'} borderRadius={'30px'} _hover={{ bgColor: '#171334', color: 'white' }}>
          <Link _hover={{ textDecoration: 'none' }} href={`/${SITE_DIRECTORY_PATHS.CREATE}`}>
            Write
          </Link>
        </Button>
      </Flex>
    </Box>
  );
}

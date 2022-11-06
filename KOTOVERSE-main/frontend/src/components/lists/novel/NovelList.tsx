import { NovelSnippetType } from '@/types/novels';
import { Grid, GridItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NovelItem from './NovelItem';

type NovelListProps = {
  novels: NovelSnippetType[];
};

const NovelList = ({ novels }: NovelListProps) => {
  return (
    <Grid
      w={'100%'}
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
      templateRows={{ base: 'repeat(1, auto)', md: 'repeat(2, auto)', lg: 'repeat(3, auto)' }}
      gap={0}
      alignItems={'stretch'}
    >
      {novels.map((novel) => {
        return (
          <Link key={novel.id} to={`/novel/${novel.id}`} state={{ novel }}>
            <GridItem key={novel.id} minH="200px" height={'100%'} maxWidth={'100%'} p={5}>
              <NovelItem {...{ novel }} />
            </GridItem>
          </Link>
        );
      })}
    </Grid>
  );
};

export default NovelList;

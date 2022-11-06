import Home from './components/Home';
import '../src/styles/global.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NovelDetail from './components/NovelDetail';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import { Box, Flex } from '@chakra-ui/react';
import NovelCreateForm from './components/NovelCreateForm';
import Recent from './components/Recent';
import Completed from './components/Completed';
import { SITE_DIRECTORY_PATHS } from './utils/constants/links';
import Category from './components/Category';
import { Buffer } from 'buffer';
import { useState } from 'react';

const App = () => {
  // TEMP: solution to fix `cannot access Buffer.buffer in client code` problem;
  globalThis.Buffer = Buffer;


  const [auth, setAuth] = useState<boolean>(false);
  return (
    <Router>
      <Flex
        minH={'100vh'}
        h={'100%'}
        w={'100%'}
        flexDir={'column'}
        justifyContent={'space-between'}
        className={'bg-grad'}
      >
        <NavBar setAuth={setAuth} />
        <main style={{ maxWidth: '100vw', flexGrow: 1 }}>
          <Box
            w={{ base: '100%', md: '90%' }}
            maxW={{ base: '100%', md: '1200px' }}
            mx={{ base: 0, md: 'auto' }}
            p={{ base: '15px 20px 0px', md: '30px' }}
          >
            <Routes>
              <Route index element={<Home />} />
              <Route path={SITE_DIRECTORY_PATHS.CREATE} element={<NovelCreateForm auth={auth} />} />
              <Route path={SITE_DIRECTORY_PATHS.RECENT} element={<Recent />} />
              <Route path={SITE_DIRECTORY_PATHS.COMPLETED} element={<Completed />} />
              <Route path={SITE_DIRECTORY_PATHS.DETAIL} element={<NovelDetail />} />
              <Route path={SITE_DIRECTORY_PATHS.CATEGORY} element={<Category />} />
            </Routes>
          </Box>
        </main>
        <Footer />
      </Flex>
    </Router>
  );
};

export default App;

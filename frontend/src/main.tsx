import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { AuthProvider } from './context/auth';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './utils/theme';
import Fonts from './components/common/Fonts';

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider, 'any');
  return library;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Fonts />
          <App />
        </ChakraProvider>
      </AuthProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);

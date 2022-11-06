import { CHAIN_IDS } from '@/utils/constants/chain';
import { getAddChainParameters } from '@/utils/switchChain';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContextType } from '../types/auth';
import { injected } from '../utils/connectors';

const AuthContext = createContext<AuthContextType>({
  accountId: undefined,
  isLoading: true,
  provider: undefined,
  error: undefined,
  chainId: undefined,
  connect: async () => undefined,
  disconnect: async () => undefined,
  switchChain: async (chainId: keyof typeof CHAIN_IDS) => undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    account: accountId,
    error,
    activate,
    deactivate,
    library: provider,
    chainId,
  } = useWeb3React<ethers.providers.Web3Provider>();

  const [isLoading, setIsLoading] = useState(true);
  console.log('auth accountId : ', accountId);

  const connect = useCallback(async () => {
    setIsLoading(true);
    await activate(injected);
    setIsLoading(false);
  }, [activate]);

  const disconnect = useCallback(async () => {
    setIsLoading(true);
    await deactivate();
    setIsLoading(false);
  }, [deactivate]);

  const switchChain = useCallback(
    async (chainId: keyof typeof CHAIN_IDS) => {
      const { ethereum } = window;

      if (!ethereum || !ethereum.request) return;

      const chainInfo = getAddChainParameters(chainId);
      await ethereum.request({ method: 'wallet_addEthereumChain', params: [chainInfo] });
    },
    [provider]
  );

  const memoisedValues = useMemo(
    () => ({
      accountId,
      isLoading,
      provider,
      error,
      chainId,
      connect,
      disconnect,
      switchChain,
    }),
    [accountId, isLoading, provider, error, chainId]
  );

  useEffect(() => {
    const handleRefresh = async () => {
      const isAuthorised = await injected.isAuthorized();
      try {
        if (isAuthorised) {
          activate(injected);
        }
      } catch (e) {
        console.error('REFRESH ERROR : ', e);
        setIsLoading(false);
      }
    };
    handleRefresh();
  }, [activate, injected]);

  return <AuthContext.Provider value={memoisedValues}>{children}</AuthContext.Provider>;
};

export default function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

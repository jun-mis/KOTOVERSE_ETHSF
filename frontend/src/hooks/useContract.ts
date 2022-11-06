import useAuth from '@/context/auth';
import { CHAIN_IDS } from '@/utils/constants/chain';
import { NETWORKS } from '@/utils/constants/networks';
import { getContract } from '@/utils/contract';
import { Contract, ethers } from 'ethers';
import { useMemo } from 'react';

export function useContract<T extends Contract = Contract>(
  contractAddress: string,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { provider: library, accountId, chainId } = useAuth();

  return useMemo(() => {
    if (!contractAddress || !ABI || !chainId) return null;

    const rpcURL = chainId === CHAIN_IDS['MUMBAI'] ? NETWORKS['MUMBAI'].rpcUrls[0] : NETWORKS['HARDHAT'].rpcUrls[0];
    const provider = library ?? new ethers.providers.JsonRpcProvider(rpcURL);

    try {
      return getContract(contractAddress, ABI, provider, withSignerIfPossible && accountId ? accountId : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [contractAddress, ABI, library, chainId, withSignerIfPossible, accountId]) as T;
}

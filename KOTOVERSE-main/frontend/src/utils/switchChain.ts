import { AddEthereumChainParameter } from '@/types/metamask';
import { SUPPORTED_CHAIN_IDS } from './constants/chain';
import { NETWORKS } from './constants/networks';

export const isChainAllowed = (chainId: number) => {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
};

export function getAddChainParameters(chain: keyof typeof NETWORKS): AddEthereumChainParameter {
  const chainInformation = NETWORKS[chain];
  const { chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls } = chainInformation;
  return {
    chainId,
    chainName,
    nativeCurrency,
    rpcUrls,
    blockExplorerUrls,
  };
}

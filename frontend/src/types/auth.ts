import { CHAIN_IDS } from '@/utils/constants/chain';
import { providers } from 'ethers';

export type AuthContextType = {
  accountId: string | null | undefined;
  isLoading: boolean;
  provider?: providers.Web3Provider | undefined;
  error: Error | undefined;
  chainId: number | undefined;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: keyof typeof CHAIN_IDS) => Promise<void>;
};

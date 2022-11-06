import { AddEthereumChainParameter } from '@/types/metamask';
import { CHAIN_IDS } from './chain';

export const NETWORKS: { [chain in keyof typeof CHAIN_IDS]: AddEthereumChainParameter } = {
  POLYGON: {
    chainId: `0x${CHAIN_IDS['POLYGON'].toString(16)}`,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  MUMBAI: {
    chainId: `0x${CHAIN_IDS['MUMBAI'].toString(16)}`,
    chainName: 'Polygon Mumbai Testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },
  HARDHAT: {
    chainId: `0x${CHAIN_IDS['HARDHAT'].toString(16)}`,
    chainName: 'Hardhat Localnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['http://127.0.0.1:8545'],
    blockExplorerUrls: [''],
  },
};

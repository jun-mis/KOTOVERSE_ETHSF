import { abi } from '../../../smart_contract/artifacts/contracts/NovelContract.sol/NovelContract.json';
import { CHAIN_IDS } from '../utils/constants/chain';
import { NovelContract } from '../typechain';
import { HARDHAT_NOVEL_CONTRACT_ADDRESS, MUMBAI_NOVEL_CONTRACT_ADDRESS } from '../utils/constants/address';
import useAuth from '@/context/auth';
import { useContract } from './useContract';

export function useNovelContract(): NovelContract | null {
  const { chainId } = useAuth();

  const contractAddress = chainId === CHAIN_IDS.MUMBAI ? MUMBAI_NOVEL_CONTRACT_ADDRESS : HARDHAT_NOVEL_CONTRACT_ADDRESS;

  return useContract(contractAddress, abi, true) as NovelContract;
}

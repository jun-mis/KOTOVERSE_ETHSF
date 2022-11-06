import { MarketPlace } from '@/typechain';
import { abi } from '../../../smart_contract/artifacts/contracts/MarketPlace.sol/MarketPlace.json';
import { CHAIN_IDS } from '@/utils/constants/chain';
import { HARDHAT_MARKET_CONTRACT_ADDRESS, MUMBAI_MARKET_CONTRACT_ADDRESS } from '@/utils/constants/address';
import useAuth from '@/context/auth';
import { useContract } from './useContract';
export function useMarketPlaceContract(): MarketPlace | null {
  const { chainId } = useAuth();

  const contractAddress =
    chainId === CHAIN_IDS.MUMBAI ? MUMBAI_MARKET_CONTRACT_ADDRESS : HARDHAT_MARKET_CONTRACT_ADDRESS;

  return useContract(contractAddress, abi, true) as MarketPlace;
}

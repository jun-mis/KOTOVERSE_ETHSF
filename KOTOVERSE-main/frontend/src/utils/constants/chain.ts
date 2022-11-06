export const CHAIN_IDS = {
  POLYGON: 137,
  MUMBAI: 80001,
  HARDHAT: 31337,
};

export const SUPPORTED_CHAIN_IDS = [...Object.values(CHAIN_IDS)] as const;

/// <reference types="vite/client" />

export interface EthereumProvider {
  on?: (...args: any[]) => void;
  removeListener?: (...args: any[]) => void;
  autoRefreshOnNetworkChange?: boolean;
}

declare global {
  interface Window {
    ethereum?: {
      request: MetamaskRequest;
      on: MetamaskEventHandler;
      removeListener: MetamaskEventHandler;
      removeAllListeners: (event: MetamaskEvent) => void;
      isMetaMask: boolean;
      isConnected: () => boolean;
    };
  }
}

type MetamaskRequest = {
  (arg: { method: 'wallet_addEthereumChain'; params: [AddEthereumChainParameter] }): Promise<null>;
  //   (arg: { method: 'wallet_switchEthereumChain'; params: [SwitchEthereumChainParameter] }): Promise<null>;
  //   (arg: { method: 'eth_requestAccounts' }): Promise<string[]>;
  //   (arg: { method: 'wallet_watchAsset'; params: WatchAssetParams }): Promise<string[]>;
};

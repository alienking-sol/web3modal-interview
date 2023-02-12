import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal, Web3Button } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, mainnet, polygon } from "wagmi/chains";
import "./App.css";

function App() {
  const chains = [arbitrum, mainnet, polygon];
  const projectId = process.env.REACT_APP_PROJECT_ID;

  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId,
      version: "1", // or "2"
      appName: "web3Modal",
      chains,
    }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);
  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <h1>Thanks for interviewing Foster!</h1>
        <Web3Button />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
}

export default App;

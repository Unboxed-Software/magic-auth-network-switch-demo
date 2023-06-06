import { EthNetworkConfiguration } from "magic-sdk"
import { SolanaConfig } from "@magic-ext/solana/dist/types/type"

// Define Network enum that represents supported networks
export enum Network {
  Sepolia = "Ethereum (Sepolia)",
  Polygon = "Polygon (Mumbai)",
  Solana = "Solana (Devnet)",
}

// Function to return the network configuration based on the selected network.
export const formattedNetwork = (
  selectedNetwork: Network
): EthNetworkConfiguration | SolanaConfig => {
  switch (selectedNetwork) {
    case Network.Solana:
      return {
        rpcUrl: "https://api.devnet.solana.com",
      }
    case Network.Polygon:
      return {
        rpcUrl: "https://rpc-mumbai.maticvigil.com/",
        chainId: 80001,
      }
    default:
      return {
        rpcUrl: "https://rpc2.sepolia.org/",
        chainId: 11155111,
      }
  }
}

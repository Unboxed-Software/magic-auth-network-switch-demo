import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { MagicNetwork } from "./MagicNetwork"
import { Network } from "./supported-networks"

// Solana class extending the abstract MagicNetwork class
export class Solana extends MagicNetwork {
  public network: Network // This network is Solana
  private connection: Connection // Connection to interact with the Solana blockchain

  // Constructor for the Solana class
  constructor() {
    super()

    // Setting the network type to Solana
    this.network = Network.Solana

    // Initializing the connection to Solana's devnet
    this.connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    )

    // Calling the initialize method from MagicNetwork
    this.initialize()
  }

  // Method to fetch the balance of a user in Solana blockchain
  public async fetchBalance(userPublicKey: string): Promise<number> {
    const balance = await this.connection.getBalance(
      new PublicKey(userPublicKey)
    )

    // Solana's raw balance is in Lamports, we convert it to SOL (1 SOL = 10^9 Lamports)
    return balance / LAMPORTS_PER_SOL
  }
}

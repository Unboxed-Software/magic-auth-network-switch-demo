import Web3 from "web3"
import { MagicNetwork } from "./MagicNetwork"
import { Network } from "./supported-networks"

// The EVM (Ethereum Virtual Machine) class extends the abstract MagicNetwork class
export class EVM extends MagicNetwork {
  // Web3 instance to interact with the Ethereum blockchain
  web3Instance: Web3 | null = null

  // The network for this class instance
  public network: Network

  constructor(network: Network) {
    super()

    // Setting the network type
    this.network = network

    // Calling the initialize method from MagicNetwork
    this.initialize()
  }

  // Asynchronous method to initialize the Web3 instance
  async initializeWeb3(): Promise<void> {
    const provider = await this.magic?.wallet.getProvider() // Get the provider from the magic
    this.web3Instance = new Web3(provider) // Initializing the Web3 instance
  }

  // Method to fetch the balance of a user in EVM based blockchain
  public async fetchBalance(userPublicKey: string): Promise<number> {
    if (!this.web3Instance) {
      // If the Web3 instance is not initialized yet, initialize it
      await this.initializeWeb3()
    }

    if (!this.web3Instance) {
      throw new Error("Web3 instance is not initialized yet.")
    }

    // Get the raw balance from the EVM blockchain
    const balance = await this.web3Instance.eth.getBalance(userPublicKey)

    // Convert the raw balance from Wei (smallest unit in Ethereum) to Ether and limit to 7 decimal places
    const balanceInEth = this.web3Instance.utils
      .fromWei(balance)
      .substring(0, 7)
    return parseFloat(balanceInEth)
  }
}

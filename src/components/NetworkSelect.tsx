import { Network } from "../network/supported-networks"
import { useNetworkContext } from "../context/NetworkContext"
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Box,
  Flex,
  Center,
} from "@chakra-ui/react"
import { ChevronDownIcon, CheckIcon } from "@chakra-ui/icons"

const NetworkSelect = () => {
  // Get list of available networks
  const networkOptions = Object.values(Network)

  // Get current selected network and updateMagicNetwork function from network context
  const { selectedNetwork, updateMagicNetwork } = useNetworkContext()

  // Define a function to handle network selection
  const handleNetworkSelected = (networkOption: Network) => {
    if (networkOption !== selectedNetwork) {
      // Store the selected network in localStorage
      localStorage.setItem("network", networkOption)
      // Update the selected network in the context
      updateMagicNetwork(networkOption)
    }
  }

  return (
    <>
      <Center color="gray.500">Select Network</Center>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedNetwork}
        </MenuButton>
        <MenuList>
          {networkOptions.map((networkOption) => (
            <MenuItem
              key={networkOption}
              onClick={() => handleNetworkSelected(networkOption)}
            >
              <Flex align="center">
                {selectedNetwork === networkOption && (
                  <Box as={CheckIcon} marginRight="10px" />
                )}
                {networkOption}
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}

export default NetworkSelect

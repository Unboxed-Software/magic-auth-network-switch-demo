import { useEffect } from "react"
import { Box, Text } from "@chakra-ui/react"
import { useUserContext } from "../context/UserContext"
import { useNetworkContext } from "../context/NetworkContext"

const UserDetails = () => {
  // Use context to get user and setUser function from UserContext
  const { user, setUser } = useUserContext()

  // Get the current network from NetworkContext
  const { network } = useNetworkContext()

  useEffect(() => {
    // Define the function to fetch the balance
    const fetchBalance = async () => {
      if (!user) return

      let newUser
      try {
        // Check if network exists and then fetch balance
        if (network) {
          const balance = await network.fetchBalance(user.publicAddress!)
          // Create a new user object with the updated balance
          newUser = { ...user, balance }
        }

        // Check if the user object has changed and then update it
        if (JSON.stringify(user) !== JSON.stringify(newUser)) {
          setUser(newUser)
        }
      } catch (error) {
        console.error("Error fetching balance: ", error)
      }
    }

    fetchBalance()
  }, [user, network, setUser])

  return (
    <Box padding="5" boxShadow="lg" bg="white">
      <Text fontWeight="bold" fontSize="xl">
        User Details
      </Text>
      {user ? (
        <Box>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </Box>
      ) : (
        <Text>No user data available.</Text>
      )}
    </Box>
  )
}

export default UserDetails

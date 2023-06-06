import { Button } from "@chakra-ui/react"
import { useUserContext } from "../context/UserContext"
import { useNetworkContext } from "../context/NetworkContext"
import { useNavigate } from "react-router-dom"

const Logout = () => {
  // Use context to get the setUser function from UserContext
  const { setUser } = useUserContext()

  // Get the current network from NetworkContext
  const { network } = useNetworkContext()
  const navigate = useNavigate()

  // Define the async function to handle user logout
  const handleLogout = async () => {
    try {
      await network?.logout()
      setUser(null)
      navigate("/")
    } catch (error) {
      console.log("Error during logout:", error)
    }
  }

  return <Button onClick={handleLogout}>Logout</Button>
}

export default Logout

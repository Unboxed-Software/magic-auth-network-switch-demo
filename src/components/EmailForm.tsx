import { useState } from "react"
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Center,
  VStack,
} from "@chakra-ui/react"
import { EmailIcon } from "@chakra-ui/icons"
import { useUserContext } from "../context/UserContext"
import { useNetworkContext } from "../context/NetworkContext"
import { useNavigate } from "react-router-dom"

const EmailForm = () => {
  // Define local state for email input
  const [email, setEmail] = useState("")

  // Use context to get the fetchUserInfo function from UserContext
  const { fetchUserInfo } = useUserContext()

  // Get the current network from NetworkContext
  const { network } = useNetworkContext()
  const navigate = useNavigate()

  // Define the async function to handle login with email
  const handleLoginWithEmail = async () => {
    if (!email) {
      return
    }

    try {
      await network?.loginWithOTP(email)
      await fetchUserInfo()
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      setEmail("")
    }
  }

  return (
    <VStack>
      <Center color="gray.500">Login</Center>
      <InputGroup size="md" mb={3} mx="auto" w="80%">
        <InputLeftElement>
          <EmailIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
      <Button onClick={handleLoginWithEmail}>Send Link</Button>
    </VStack>
  )
}

export default EmailForm

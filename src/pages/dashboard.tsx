import NetworkSelect from "../components/NetworkSelect"
import UserDetails from "../components/UserDetail"
import Logout from "../components/Logout"
import { VStack } from "@chakra-ui/react"

const Dashboard = () => {
  return (
    <VStack justifyContent="center" alignItems="center" minH="100vh">
      <UserDetails />
      <NetworkSelect />
      <Logout />
    </VStack>
  )
}

export default Dashboard

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react"
import { useNetworkContext } from "./NetworkContext"

// Define context
type UserContextType = {
  user: any
  setUser: React.Dispatch<React.SetStateAction<any>>
  fetchUserInfo: () => void
}

// Create context with a default value
const UserContext = createContext<UserContextType>({
  user: null, // Initially, no user is logged in
  setUser: () => {}, // Placeholder function, will be overwritten by provider
  fetchUserInfo: () => {}, // Placeholder function, will be overwritten by provider
})

// A custom hook to use context
export const useUserContext = () => useContext(UserContext)

// Provider component that wraps the app
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Access the network context
  const { network } = useNetworkContext()

  // Local state for storing user data
  const [user, setUser] = useState<any>(null)

  // Function to fetch user information from magic
  const fetchUserInfo = useCallback(async () => {
    try {
      if (network) {
        const userInfo = await network.getInfo()
        setUser(userInfo)
      }
    } catch (error) {
      console.log("Error fetching userInfo: ", error)
    }
  }, [network])

  useEffect(() => {
    if (!network) return

    // Check if user is logged in
    const checkLoggedInStatus = async () => {
      const loggedIn = await network.isLoggedIn()
      if (loggedIn) {
        // If logged in, fetch user info
        await fetchUserInfo()
      }
    }

    checkLoggedInStatus()
  }, [network, fetchUserInfo])

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}

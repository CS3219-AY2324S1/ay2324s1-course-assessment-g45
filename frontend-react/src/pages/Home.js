import { useUserContext } from "../hooks/useUserContext"
import Profile from "./Profile"

const Home = () => {
  const { user, dispatch } = useUserContext()
  return (
    <div className="page">
      {
        user && <Profile user={user}/>
      }
    </div>
  )
}

export default Home
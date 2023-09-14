import { useNavigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"

const Home = () => {
  const { user, dispatch } = useUserContext()
  const navigate = useNavigate()
  return (
    <div className="page">
    </div>
  )
}

export default Home
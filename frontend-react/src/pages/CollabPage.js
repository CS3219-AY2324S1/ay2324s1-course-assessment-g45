import { useNavigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import CollabEditor from "../components/CollabEditor"

const CollabPage = () => {
  const { user, dispatch } = useUserContext()
  const navigate = useNavigate()
  return (
    <div>
      <CollabEditor/>
    </div>
  )
}

export default CollabPage
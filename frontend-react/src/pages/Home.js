import { useNavigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import QuestionTable from "../components/QuestionTable"

const Home = () => {
  const { user, dispatch } = useUserContext()
  const navigate = useNavigate()
  return (
    <div>
      <QuestionTable/>
    </div>
  )
}

export default Home
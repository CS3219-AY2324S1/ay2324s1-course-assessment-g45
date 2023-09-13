import { useUserContext } from "../hooks/useUserContext"
import Profile from "./Profile"
import QuestionTable from "../components/QuestionTable"

const Home = () => {
  const { user, dispatch } = useUserContext()
  return (
    <div>
      <QuestionTable/>
    </div>
  )
}

export default Home
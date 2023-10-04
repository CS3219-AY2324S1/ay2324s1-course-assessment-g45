import { useNavigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import QuestionTable from "../components/question/QuestionTable"
import CodeEditor from "../components/CodeEditor"
import MonacoCodeEditor from "../components/MonacoCodeEditor"

const Home = () => {
  const { user, dispatch } = useUserContext()
  const navigate = useNavigate()
  return (
    <div>
      <MonacoCodeEditor/>
      {/* <CodeEditor/>
      <QuestionTable/> */}
    </div>
  )
}

export default Home